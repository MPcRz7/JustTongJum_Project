class StaticVariable {
    constructor() {}
  
    // static currentUser = {
    //   uname: 'xxx77',
    //   firstname: 'first',
    //   lastname: 'last'
    // };

    static IpAddress = "127.0.0.1";
    //static IpAddress = "10.0.2.2";
    static Port = 3000;
    static FullAddressPath = 'http://' + this.IpAddress + ':' + this.Port + '/';
  
    // static getCurrentUser() {
    //   return this.currentUser;
    // }
  }

  export default StaticVariable;