import { LitElement, html, css } from 'lit';
import { HomeAssistant } from 'custom-card-helpers';

class GeweNotifyCard extends LitElement {
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
      display: inline-block;
      padding: 8px 16px;
      margin-right: 8px;
      cursor: pointer;
      background-color: var(--secondary-background-color);
      border-radius: 8px;
    }

    .tab.active {
      background-color: var(--primary-color);
      color: white;
    }

    .data-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 12px;


    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 16px;
    }

    .filter-container {
      margin-bottom: 16px;
    }

    .filter-input {
      padding: 8px;
      width: 30%;
      margin-right: 10px;
      border-radius: 4px;
      border: 1px solid var(--primary-color);
    }
  `;

  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
      currentTab: { type: String },
      page: { type: Number },
      friends: { type: Array },
      chatrooms: { type: Array },
      filteredFriends: { type: Array },
      filteredChatrooms: { type: Array },
      filterText: { type: String },
      filterTimeout: { type: Number },
    };
  }

  constructor() {
    super();
    this.currentTab = 'friends';
    this.page = 1;
    this.friends = [];
    this.chatrooms = [];
    this.filteredFriends = [];
    this.filteredChatrooms = [];
    this.filterText = '';
    this.filterTimeout = null;
    this.hass = {};
    this._config = {};
  }

  setConfig(config) {
    this._config = config;
  }

  updated(changedProperties) {
    if (changedProperties.has('hass')) {
      this.fetchData();
    }
    if (changedProperties.has('filterText')) {
      clearTimeout(this.filterTimeout);
      this.filterTimeout = setTimeout(() => {
        this.filterData();
        this.page = 1;
      }, 300);
    }
  }

  fetchData() {
    if (!this.hass) return;

    this.hass.callApi('GET', 'gewe_contacts')
      .then(result => {
        console.log('API call result:', result);
        this.friends = result.friends || [];
        this.chatrooms = result.chatrooms || [];
        this.filterData();
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }

  filterData() {
    const filterText = this.filterText.toLowerCase();

    this.filteredFriends = this.friends.filter(item =>
      [item.userName, item.nickName, item.remark]
        .join(' ')
        .toLowerCase()
        .includes(filterText)
    );

    this.filteredChatrooms = this.chatrooms.filter(item =>
      [item.userName, item.nickName, item.remark]
        .join(' ')
        .toLowerCase()
        .includes(filterText)
    );
  }

  handleTabChange(tab) {
    this.currentTab = tab;
    this.page = 1;
  }

  handlePageChange(page) {
    this.page = page;
  }

  handleFilterChange(event) {
    this.filterText = event.target.value;
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
      console.log("hass or _config error!")
    }

    const itemsPerPage = 5;
    const currentPageData =
      this.currentTab === 'friends' ? this.filteredFriends : this.filteredChatrooms;

    const totalPages = Math.ceil(currentPageData.length / itemsPerPage);
    const startIndex = (this.page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageDataSlice = currentPageData.slice(startIndex, endIndex);

    return html`
      <ha-card class="card">
        <h1>Contacts</h1>

        <div class="filter-container">
          <input
            class="filter-input"
            type="text"
            .value="${this.filterText}"
            @input="${this.handleFilterChange}"
            placeholder="Filter by userName, nickName, or remark"
          />
        </div>

        <div>
          <div class="tab ${this.currentTab === 'friends' ? 'active' : ''}" @click="${() => this.handleTabChange('friends')}">
            Friends
          </div>
          <div class="tab ${this.currentTab === 'chatrooms' ? 'active' : ''}" @click="${() => this.handleTabChange('chatrooms')}">
            Chatrooms
          </div>
        </div>

        <div class="data-list">
          ${currentPageDataSlice.map(item => html`
            <div class="data-item">
              <img class="avatar" src="${item.smallHeadImgUrl || '/local/default-avatar.png'}" alt="avatar" />
              <div><strong>${item.userName}</strong></div>
              <div>${item.nickName}</div>
              <div>${item.remark}</div>
            </div>
          `)}
        </div>

        <div class="pagination">
          ${this.page > 1 ? html`
            <button class="page-button" @click="${() => this.handlePageChange(this.page - 1)}">Previous</button>
          ` : ''}
          <span>Page ${this.page} of ${totalPages}</span>
          ${this.page < totalPages ? html`
            <button class="page-button" @click="${() => this.handlePageChange(this.page + 1)}">Next</button>
          ` : ''}
        </div>
      </ha-card>
    `;
  }
}

customElements.define('gewe-notify-card', GeweNotifyCard);
