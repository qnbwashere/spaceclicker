export class AuthManager {
  constructor() {
    this.currentUser = null;
  }

  register(username, password) {
    // Check if username already exists
    const existingUsers = this.getAllUsers();
    if (existingUsers[username]) {
      throw new Error('Username already exists');
    }

    // Hash password (basic implementation)
    const hashedPassword = this.hashPassword(password);

    // Store user
    existingUsers[username] = {
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('spaceMiningUsers', JSON.stringify(existingUsers));
    return true;
  }

  login(username, password) {
    const existingUsers = this.getAllUsers();
    const user = existingUsers[username];

    if (!user) {
      throw new Error('User not found');
    }

    // Check password
    if (this.verifyPassword(password, user.password)) {
      this.currentUser = username;
      return true;
    }

    throw new Error('Invalid password');
  }

  logout() {
    this.currentUser = null;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getAllUsers() {
    const users = localStorage.getItem('spaceMiningUsers');
    return users ? JSON.parse(users) : {};
  }

  // Extremely basic "hashing" - do NOT use in production!
  hashPassword(password) {
    // Simple obfuscation
    return btoa(password);
  }

  verifyPassword(inputPassword, storedPassword) {
    return btoa(inputPassword) === storedPassword;
  }

  saveGameState(gameState) {
    if (!this.currentUser) {
      console.warn('No user logged in');
      return;
    }

    const users = this.getAllUsers();
    users[this.currentUser].gameState = gameState;
    localStorage.setItem('spaceMiningUsers', JSON.stringify(users));
  }

  loadGameState() {
    if (!this.currentUser) {
      console.warn('No user logged in');
      return null;
    }

    const users = this.getAllUsers();
    return users[this.currentUser]?.gameState || null;
  }
}