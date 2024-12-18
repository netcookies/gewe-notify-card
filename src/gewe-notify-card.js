import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers'; // 引入 Home Assistant 的工具库
import '@webcomponents/webcomponentsjs';

@customElement('gewe-notify-card')
class FetchContactsCard extends LitElement {
  static styles = css`
    .card {
      padding: 16px;
      background: var(--ha-card-background);
      border-radius: 8px;
    }

    .page-button {
      margin-top: 16px;
      cursor: pointer;
      padding: 8px;
      background-color: var(--primary-color);
      color: white;
      border-radius: 4px;
      font-weight: bold;
      text-align: center;
    }

    .tab {
      display: flex;
      justify-content: space-around;
      cursor: pointer;
      margin-bottom: 16px;
      padding: 8px;
      background-color: var(--secondary-background-color);
      border-radius: 8px;
    }

    .tab.active {
      background-color: var(--primary-color);
      color: white;
    }

    .data-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 12px;
      text-align: center;
    }

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 16px;
    }

    .filter-container {
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
    }

    .filter-input {
      padding: 8px;
      width: 30%;
      margin-right: 10px;
      border-radius: 4px;
      border: 1px solid var(--primary-color);
    }
  `;

  static properties = {
    hass: { type: Object },
    currentTab: { type: String },
    page: { type: Number },
    friends: { type: Array },
    chatrooms: { type: Array },
    filteredFriends: { type: Array },
    filteredChatrooms: { type: Array },
    filterText: { type: String },
  };

  constructor() {
    super();
    this.currentTab = 'friends'; // 默认显示朋友标签
    this.page = 1;
    this.friends = [];
    this.chatrooms = [];
    this.filteredFriends = [];
    this.filteredChatrooms = [];
    this.filterText = '';
    this.filterTimeout = null; // 防抖用的计时器
  }

  // 获取数据的函数
  async fetchData() {
    try {
      const result = await this.hass.callApi('GET', '/api/gewe_contacts');
      this.friends = result.attributes.friends || [];
      this.chatrooms = result.attributes.chatrooms || [];

      // 初始过滤
      this.filterData();
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  }

  // 过滤数据的函数
  filterData() {
    const filterText = this.filterText.toLowerCase();

    this.filteredFriends = this.friends.filter((item) =>
      [item.userName, item.nickName, item.remark]
        .join(' ')
        .toLowerCase()
        .includes(filterText)
    );

    this.filteredChatrooms = this.chatrooms.filter((item) =>
      [item.userName, item.nickName, item.remark]
        .join(' ')
        .toLowerCase()
        .includes(filterText)
    );
  }

  // 处理标签切换
  handleTabChange(tab) {
    this.currentTab = tab;
    this.page = 1; // 切换标签时重置页面为第一页
    this.requestUpdate();
  }

  // 处理分页
  handlePageChange(page) {
    this.page = page;
    this.requestUpdate();
  }

  // 处理过滤输入变化（防抖优化）
  handleFilterChange(event) {
    clearTimeout(this.filterTimeout);
    this.filterTimeout = setTimeout(() => {
      this.filterText = event.target.value;
      this.filterData();
      this.page = 1; // 清空分页
      this.requestUpdate();
    }, 300); // 延迟 300 毫秒
  }

  // 渲染数据并显示分页
  render() {
    const itemsPerPage = 5;
    const currentPageData =
      this.currentTab === 'friends'
        ? this.filteredFriends
        : this.filteredChatrooms;

    const totalPages = Math.ceil(currentPageData.length / itemsPerPage);
    const startIndex = (this.page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageDataSlice = currentPageData.slice(startIndex, endIndex);

    return html`
      <ha-card class="card">
        <h1>Contacts</h1>

        <!-- 过滤输入框 -->
        <div class="filter-container">
          <input
            class="filter-input"
            type="text"
            .value="${this.filterText}"
            @input="${this.handleFilterChange}"
            placeholder="Filter by userName, nickName, or remark"
          />
        </div>

        <!-- Tab 切换按钮 -->
        <div class="tab-container">
          <div
            class="tab ${this.currentTab === 'friends' ? 'active' : ''}"
            @click="${() => this.handleTabChange('friends')}"
          >
            Friends
          </div>
          <div
            class="tab ${this.currentTab === 'chatrooms' ? 'active' : ''}"
            @click="${() => this.handleTabChange('chatrooms')}"
          >
            Chatrooms
          </div>
        </div>

        <!-- 渲染当前标签的数据 -->
        <div class="data-list">
          ${currentPageDataSlice.map(
            (item) => html`
              <div class="data-item">
                <img
                  class="avatar"
                  src="${item.smallHeadImgUrl || '/local/default-avatar.png'}"
                  alt="avatar"
                />
                <div><strong>${item.userName}</strong></div>
                <div>${item.nickName}</div>
                <div>${item.remark}</div>
              </div>
            `
          )}
        </div>

        <!-- 分页 -->
        <div class="pagination">
          ${this.page > 1
            ? html`
                <button
                  class="page-button"
                  @click="${() => this.handlePageChange(this.page - 1)}"
                >
                  Previous
                </button>
              `
            : ''}
          <span>Page ${this.page} of ${totalPages}</span>
          ${this.page < totalPages
            ? html`
                <button
                  class="page-button"
                  @click="${() => this.handlePageChange(this.page + 1)}"
                >
                  Next
                </button>
              `
            : ''}
        </div>
      </ha-card>
    `;
  }

  // 在卡片首次加载时获取数据
  firstUpdated() {
    this.fetchData();
  }
}

