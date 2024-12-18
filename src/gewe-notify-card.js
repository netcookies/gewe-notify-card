import { LitElement, html, css } from 'lit';
import { HomeAssistant } from 'custom-card-helpers';
import '@webcomponents/webcomponentsjs';

class GeweNotifyCard extends LitElement {
  static get styles() {
    return css`
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
  }

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
    this.hass = {}; // 初始化为空对象，后续需要在 firstUpdated 中赋值
  }

  fetchData() {
    return this.hass.callApi('GET', '/api/gewe_contacts')
      .then(result => {
        this.friends = result.attributes.friends || [];
        this.chatrooms = result.attributes.chatrooms || [];
        this.filterData();
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }

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

  handleTabChange(tab) {
    this.currentTab = tab;
    this.page = 1; // 切换标签时重置页面为第一页
    this.requestUpdate();
  }

  handlePageChange(page) {
    this.page = page;
    this.requestUpdate();
  }

  handleFilterChange(event) {
    clearTimeout(this.filterTimeout);
    this.filterTimeout = setTimeout(() => {
      this.filterText = event.target.value;
      this.filterData();
      this.page = 1; // 清空分页
      this.requestUpdate();
    }, 300); // 延迟 300 毫秒
  }

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

  firstUpdated() {
    this.fetchData();
  }
}

customElements.define('gewe-notify-card', GeweNotifyCard);

