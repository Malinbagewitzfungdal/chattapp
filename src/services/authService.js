
export const getCsrfToken = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/csrf`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    if (!response.ok) throw new Error('Failed to get CSRF token');
    return data.csrfToken;
  } catch (error) {
    console.error('CSRF Error:', error);
    throw error;
  }
};


export const registerUser = async ({ username, email, password, csrfToken }) => {
  const avatar = "https://i.pravatar.cc/200";
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, avatar, csrfToken }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Registration failed');
    return data;
  } catch (error) {
    console.error('Register Error:', error);
    throw error;
  }
};


export const loginUser = async ({ username, password, csrfToken }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, csrfToken }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');

 
    localStorage.setItem('token', data.token);

    return data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};


export const fetchMessages = async (conversationId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/messages`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch messages');

    return data.map(msg => ({
      id: msg.id,
      userId: msg.userId,
      content: msg.text,
      conversationId: msg.conversationId,
      createdAt: msg.createdAt
    }));
  } catch (error) {
    console.error('Fetch Messages Error:', error);
    throw error;
  }
};


export const createMessage = async (text, conversationId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text, conversationId }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create message');

    return {
      id: data.latestMessage.id,
      userId: data.latestMessage.userId || 'unknown', 
      content: data.latestMessage.text,
      conversationId: data.latestMessage.conversationId,
      createdAt: data.latestMessage.createdAt || new Date().toISOString()
    };
  } catch (error) {
    console.error('Create Message Error:', error);
    throw error;
  }
};


export const deleteMessage = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/messages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      let errorMessage = 'Failed to delete message';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {}
      throw new Error(errorMessage);
    }

  } catch (error) {
    console.error('Delete Message Error:', error);
    throw error;
  }
};


export const logoutUser = () => {
  localStorage.removeItem('token');
};


export const isLoggedIn = () => !!localStorage.getItem('token');
