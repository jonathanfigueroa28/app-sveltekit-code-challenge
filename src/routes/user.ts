 class user {
    user_id: number;
    username: string;
    password: string;
    active: boolean;
    
    constructor(user_id: number, username: string, password: string, active: boolean) {
      this.user_id = user_id;
      this.username = username;
      this.password = password;
      this.active = active;
    }
  }
  let user1 = new user(1, "admin", "admin_pro123", true);
    let user2 = new user(2, "user", "contrasenia123", false);
    let user3 = new user(3, "pepito", "9876543210", true);
  let users = [user1, user2, user3];
  export {user,users};