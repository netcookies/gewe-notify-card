import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers'; // 引入 Home Assistant 的工具库

@customElement('fetch-contacts-card')
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
    this.currentTab = 'friends';  // 默认显示朋友标签
    this.page = 1;
    this.friends = [];
    this.chatrooms = [];
    this.filteredFriends = [];
    this.filteredChatrooms = [];
    this.filterText = '';
  }

  // 获取数据的函数
  async fetchData() {
    const result = await this.hass.callApi('GET', '/api/gewe_contacts');
    this.friends = result.attributes.friends || [];
    this.chatrooms = result.attributes.chatrooms || [];

    // 初始过滤
    this.filterData();
  }

  // 过滤数据的函数
  filterData() {
    const filterText = this.filterText.toLowerCase();

    this.filteredFriends = this.friends.filter(item => 
      item.userName.toLowerCase().includes(filterText) ||
      item.nickName.toLowerCase().includes(filterText) ||
      item.remark.toLowerCase().includes(filterText)
    );

    this.filteredChatrooms = this.chatrooms.filter(item => 
      item.userName.toLowerCase().includes(filterText) ||
      item.nickName.toLowerCase().includes(filterText) ||
      item.remark.toLowerCase().includes(filterText)
    );
  }

  // 处理标签切换
  handleTabChange(tab) {
    this.currentTab = tab;
    this.page = 1;  // 切换标签时重置页面为第一页
    this.requestUpdate();
  }

  // 处理分页
  handlePageChange(page) {
    this.page = page;
    this.requestUpdate();
  }

  // 处理过滤输入变化
  handleFilterChange(event) {
    this.filterText = event.target.value;
    this.filterData(); // 每次输入时重新过滤数据
    this.page = 1;  // 清空分页
    this.requestUpdate();
  }

  // 渲染数据并显示分页
  render() {
    const itemsPerPage = 5;
    let currentPageData = [];
    if (this.currentTab === 'friends') {
      currentPageData = this.filteredFriends;
    } else if (this.currentTab === 'chatrooms') {
      currentPageData = this.filteredChatrooms;
    }

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
            @click="${() => this.handleTabChange('friends')}">Friends</div>
          <div 
            class="tab ${this.currentTab === 'chatrooms' ? 'active' : ''}"
            @click="${() => this.handleTabChange('chatrooms')}">Chatrooms</div>
        </div>

        <!-- 渲染当前标签的数据 -->
        <div class="data-list">
          ${currentPageDataSlice.map(item => html`
            <div class="data-item">
              <img class="avatar" src="${item.smallHeadImgUrl}" alt="avatar">
              <div><strong>${item.userName}</strong></div>
              <div>${item.nickName}</div>
              <div>${item.remark}</div>
            </div>
          `)}
        </div>

        <!-- 分页 -->
        <div class="pagination">
          ${this.page > 1 ? html`<button class="page-button" @click="${() => this.handlePageChange(this.page - 1)}">Previous</button>` : ''}
          <span>Page ${this.page}</span>
          ${this.page * itemsPerPage < currentPageData.length ? html`<button class="page-button" @click="${() => this.handlePageChange(this.page + 1)}">Next</button>` : ''}
        </div>
      </ha-card>
    `;
  }

  // 在卡片首次加载时获取数据
  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }
}

