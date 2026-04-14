const state = {
  token: localStorage.getItem('pixokin_token') || null,
  user: JSON.parse(localStorage.getItem('pixokin_user') || 'null'),
  albums: [],
  selectedAlbum: null
};

const el = {
  authSection: document.querySelector('#authSection'),
  appSection: document.querySelector('#appSection'),
  logoutBtn: document.querySelector('#logoutBtn'),
  showLogin: document.querySelector('#showLogin'),
  showSignup: document.querySelector('#showSignup'),
  loginForm: document.querySelector('#loginForm'),
  signupForm: document.querySelector('#signupForm'),
  createAlbumBtn: document.querySelector('#createAlbumBtn'),
  joinAlbumBtn: document.querySelector('#joinAlbumBtn'),
  albumName: document.querySelector('#albumName'),
  inviteCode: document.querySelector('#inviteCode'),
  albumList: document.querySelector('#albumList'),
  mediaTitle: document.querySelector('#mediaTitle'),
  selectedAlbumHint: document.querySelector('#selectedAlbumHint'),
  uploadForm: document.querySelector('#uploadForm'),
  uploadFile: document.querySelector('#uploadFile'),
  caption: document.querySelector('#caption'),
  mediaGrid: document.querySelector('#mediaGrid'),
  toast: document.querySelector('#toast')
};

const showToast = (message) => {
  el.toast.textContent = message;
  el.toast.classList.remove('hidden');
  setTimeout(() => el.toast.classList.add('hidden'), 2400);
};

const api = async (path, options = {}) => {
  const res = await fetch(path, {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(state.token ? { Authorization: `Bearer ${state.token}` } : {}),
      ...(options.headers || {})
    }
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message);
  }

  return res.status === 204 ? null : res.json();
};

const persistAuth = (payload) => {
  state.token = payload.token;
  state.user = payload.user;
  localStorage.setItem('pixokin_token', payload.token);
  localStorage.setItem('pixokin_user', JSON.stringify(payload.user));
};

const clearAuth = () => {
  state.token = null;
  state.user = null;
  state.albums = [];
  state.selectedAlbum = null;
  localStorage.removeItem('pixokin_token');
  localStorage.removeItem('pixokin_user');
};

const renderAuth = () => {
  const loggedIn = !!state.token;
  el.authSection.classList.toggle('hidden', loggedIn);
  el.appSection.classList.toggle('hidden', !loggedIn);
  el.logoutBtn.classList.toggle('hidden', !loggedIn);
};

const renderAlbums = () => {
  el.albumList.innerHTML = '';

  state.albums.forEach((album) => {
    const li = document.createElement('li');
    li.className = `list-item ${state.selectedAlbum?._id === album._id ? 'active' : ''}`;
    li.innerHTML = `<span>${album.name}</span><small>${album.role || 'Member'}</small>`;
    li.addEventListener('click', () => selectAlbum(album));
    el.albumList.appendChild(li);
  });
};

const renderMedia = (items) => {
  el.mediaGrid.innerHTML = '';

  if (!items.length) {
    el.mediaGrid.innerHTML = '<p class="muted">No media yet.</p>';
    return;
  }

  items.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'media-card';
    card.innerHTML = `
      ${item.type === 'video'
        ? `<video src="${item.url}" controls preload="metadata"></video>`
        : `<img src="${item.url}" alt="${item.caption || 'media'}" />`}
      <div class="media-meta">${item.caption || 'No caption'} • ${new Date(item.createdAt).toLocaleDateString()}</div>
    `;
    el.mediaGrid.appendChild(card);
  });
};

const loadAlbums = async () => {
  const albums = await api('/api/albums');
  state.albums = albums;
  renderAlbums();
};

const loadMedia = async () => {
  if (!state.selectedAlbum) return;
  const media = await api(`/api/media/${state.selectedAlbum._id}?page=1&limit=60`);
  renderMedia(media);
};

const selectAlbum = async (album) => {
  state.selectedAlbum = album;
  el.mediaTitle.textContent = `Album Media • ${album.name}`;
  el.selectedAlbumHint.classList.add('hidden');
  el.uploadForm.classList.remove('hidden');
  renderAlbums();
  await loadMedia();
};

el.showLogin.addEventListener('click', () => {
  el.loginForm.classList.remove('hidden');
  el.signupForm.classList.add('hidden');
  el.showLogin.classList.add('active');
  el.showSignup.classList.remove('active');
});

el.showSignup.addEventListener('click', () => {
  el.signupForm.classList.remove('hidden');
  el.loginForm.classList.add('hidden');
  el.showSignup.classList.add('active');
  el.showLogin.classList.remove('active');
});

el.loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);

  try {
    const payload = await api('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(form.entries()))
    });
    persistAuth(payload);
    renderAuth();
    await loadAlbums();
    showToast('Logged in');
  } catch (error) {
    showToast(error.message);
  }
});

el.signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);

  try {
    const payload = await api('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(form.entries()))
    });
    persistAuth(payload);
    renderAuth();
    await loadAlbums();
    showToast('Account created');
  } catch (error) {
    showToast(error.message);
  }
});

el.logoutBtn.addEventListener('click', () => {
  clearAuth();
  renderAuth();
  renderAlbums();
  el.mediaGrid.innerHTML = '';
  el.selectedAlbumHint.classList.remove('hidden');
  el.uploadForm.classList.add('hidden');
  showToast('Logged out');
});

el.createAlbumBtn.addEventListener('click', async () => {
  if (!el.albumName.value.trim()) return showToast('Album name is required');

  try {
    await api('/api/albums', {
      method: 'POST',
      body: JSON.stringify({ name: el.albumName.value.trim() })
    });
    el.albumName.value = '';
    await loadAlbums();
    showToast('Album created');
  } catch (error) {
    showToast(error.message);
  }
});

el.joinAlbumBtn.addEventListener('click', async () => {
  if (!el.inviteCode.value.trim()) return showToast('Invite code is required');

  try {
    await api('/api/albums/join', {
      method: 'POST',
      body: JSON.stringify({ inviteCode: el.inviteCode.value.trim() })
    });
    el.inviteCode.value = '';
    await loadAlbums();
    showToast('Joined album');
  } catch (error) {
    showToast(error.message);
  }
});

el.uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!state.selectedAlbum) return showToast('Select an album first');

  const file = el.uploadFile.files[0];
  if (!file) return showToast('Pick a file first');

  const data = new FormData();
  data.append('file', file);
  if (el.caption.value.trim()) data.append('caption', el.caption.value.trim());

  try {
    await api(`/api/media/${state.selectedAlbum._id}/upload`, {
      method: 'POST',
      body: data
    });

    el.uploadForm.reset();
    await loadMedia();
    showToast('Upload complete');
  } catch (error) {
    showToast(error.message);
  }
});

const bootstrap = async () => {
  renderAuth();
  if (state.token) {
    try {
      await loadAlbums();
    } catch (error) {
      clearAuth();
      renderAuth();
      showToast(`Session expired: ${error.message}`);
    }
  }
};

bootstrap();
