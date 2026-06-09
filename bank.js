// ═══════════════════════════════════════════
//   NEXABANK — bank.js
//   C++ logic converted to JavaScript
//   Same logic, new language
// ═══════════════════════════════════════════

// ── MEMBER DATABASE (your C++ add_member calls) ──
// ── BASE MEMBER DATA ──
const defaultMembers = [
  { name: "SHIVANGI NIGAM",       id: 1057, password: "shivangi",  balance: 71240 },
  { name: "LAKSHYA PUNDIR",       id: 1058, password: "lakshya",   balance: 73450 },
  { name: "ARYAN GUPTA",          id: 1059, password: "aryan",     balance: 70620 },
  { name: "PRANJAL KUSHWAHA",     id: 1061, password: "pranjal",   balance: 72160 },
  { name: "AANYA SINGH",          id: 1062, password: "aanya",     balance: 75840 },
  { name: "DHRUV MATHUR",         id: 1064, password: "dhruv",     balance: 73920 },
  { name: "TOYESH SRIVASTAVA",    id: 1065, password: "toyesh",    balance: 76475 },
  { name: "BHAVAY JOSHI",         id: 1066, password: "bhavay",    balance: 74830 },
  { name: "AKSHAT VERMS",         id: 1067, password: "akshat",    balance: 77690 },
  { name: "JEEVAN R",             id: 1069, password: "jeevan",    balance: 72980 },
  { name: "TEJAS GAUTAM",         id: 1070, password: "tejas",     balance: 76345 },
  { name: "TANI SINGH",           id: 1071, password: "tani",      balance: 77160 },
  { name: "RETVIJ SHRIVASTAV",    id: 1072, password: "retvij",    balance: 75470 },
  { name: "ASLESHA",              id: 1074, password: "aslesha",   balance: 78210 },
  { name: "LAKSHAY TYAGI",        id: 1075, password: "lakshay",   balance: 74140 },
  { name: "ARYAN TIWARI",         id: 1076, password: "aryan",     balance: 73560 },
  { name: "TANISHQ PAL",          id: 1077, password: "tanishq",   balance: 76980 },
  { name: "AMISHI GARG",          id: 1078, password: "amishi",    balance: 71820 },
  { name: "VAIBHAV VERMA",        id: 1079, password: "vaibhav",   balance: 75230 },
  { name: "SHAURYA RAI",          id: 1080, password: "shaurya",   balance: 77110 },
  { name: "KUMAR DAKSH",          id: 1081, password: "daksh",     balance: 74480 },
  { name: "KRISH LALWANI",        id: 1082, password: "krish",     balance: 76320 },
  { name: "TANMAY TYAGI",         id: 1083, password: "tanmay",    balance: 78560 },
  { name: "HARSHIT CHAUDHARY",    id: 1084, password: "harshit",   balance: 71780 },
  { name: "YASH SHARMA",          id: 1085, password: "yash",      balance: 79640 },
  { name: "YASH GREWAL",          id: 1086, password: "yash",      balance: 75890 },
  { name: "ITISH SINGHAL",        id: 1088, password: "itish",     balance: 74420 },
  { name: "KARTIK AGARWAL",       id: 1089, password: "kartik",    balance: 78950 },
  { name: "ATHARV GARG",          id: 1090, password: "atharv",    balance: 77320 },
  { name: "AARADHYA SRIVASTAVA",  id: 1091, password: "aaradhya",  balance: 76875 },
  { name: "RITVIK NEEL DAS",      id: 1093, password: "ritvik",    balance: 75230 },
  { name: "ATHARAV PANDEY",       id: 1094, password: "atharav",   balance: 77890 },
  { name: "NIRBHAY KUMAR",        id: 1095, password: "nirbhay",   balance: 78420 },
  { name: "VANYA SRIVASTAVA",     id: 1096, password: "vanya",     balance: 75640 },
  { name: "ARNAV JAIN",           id: 1097, password: "arnav",     balance: 79210 },
  { name: "ARNAV SINGH CHAUHAN",  id: 1099, password: "arnav",     balance: 76140 },
  { name: "PRIYANSH MITTAL",      id: 1100, password: "priyansh",  balance: 77430 },
  { name: "ADDHYYAN GOEL",        id: 1101, password: "addhyyan",  balance: 74860 },
  { name: "ARCHIT SRIVASTAVA",    id: 1102, password: "archit",    balance: 78230 },
  { name: "AYUSH KUMAR",          id: 1103, password: "ayush",     balance: 75980 },
  { name: "DEEP CHAUDHARY",       id: 1104, password: "deep",      balance: 77210 },
  { name: "MANSHI VERMA",         id: 1105, password: "manshi",    balance: 73890 },
  { name: "GAGANDEEP SINGH",      id: 1106, password: "gagandeep", balance: 78140 },
  { name: "YUVRAJ KATARIA",       id: 1107, password: "yuvraj",    balance: 74980 },
  { name: "KHUSHI CHAUHAN",       id: 1108, password: "khushi",    balance: 77360 },
  { name: "HARSHIT SHARMA",       id: 1109, password: "harshit",   balance: 79750 },
  { name: "ADHIRAJ MAHESHWARI",   id: 1110, password: "adhiraj",   balance: 77140 },
];

const admins = [
  { name: "SHASHWAT BHATT", id: 1056 },
  { name: "ATHARV VERMA",   id: 1060 },
  { name: "ABHINAV GARG",   id: 1068 },
  { name: "VIBHOR SINGH",   id: 1073 },
];

// ── LOAD MEMBERS FROM SESSION OR USE DEFAULT ──
// This is the key fix — if members exist in session, use those
// otherwise load the defaults for the first time
let members = [];

function initMembers() {
  const saved = sessionStorage.getItem("members");
  if (saved) {
    members = JSON.parse(saved); // use saved data (with updated balances)
  } else {
    members = JSON.parse(JSON.stringify(defaultMembers)); // fresh copy of defaults
    sessionStorage.setItem("members", JSON.stringify(members));
  }
}

// Run immediately when bank.js loads
initMembers();

// ── STORAGE HELPERS ──
function getLoans() {
  return JSON.parse(sessionStorage.getItem("loans") || "[]");
}
function saveLoans(loans) {
  sessionStorage.setItem("loans", JSON.stringify(loans));
}
function getTransactions() {
  return JSON.parse(sessionStorage.getItem("transactions") || "[]");
}
function saveTransactions(txns) {
  sessionStorage.setItem("transactions", JSON.stringify(txns));
}
function saveMembers() {
  sessionStorage.setItem("members", JSON.stringify(members));
}



// ── LOAD SESSION DATA ON EVERY PAGE ──


// ═══════════════════════════════════
//   LOGIN FUNCTIONS
// ═══════════════════════════════════

// Same as your C++ member_login()
function memberLogin(id, password) {
  const member = members.find(m => m.id === parseInt(id));
  if (!member) return { success: false, msg: "Member ID does not exist!" };
  if (member.password !== password) return { success: false, msg: "Incorrect password!" };

  // Save logged in member to sessionStorage (like your loggedInMember pointer)
  sessionStorage.setItem("loggedInMember", JSON.stringify(member));
  return { success: true, member };
}

// Same as your C++ admin_login()
function adminLogin(id) {
  const admin = admins.find(a => a.id === parseInt(id));
  if (!admin) return { success: false, msg: "Invalid access code!" };

  sessionStorage.setItem("loggedInAdmin", JSON.stringify(admin));
  return { success: true, admin };
}

// Get currently logged in member (like your loggedInMember pointer)
function getLoggedInMember() {
  return JSON.parse(sessionStorage.getItem("loggedInMember"));
}
function getLoggedInAdmin() {
  return JSON.parse(sessionStorage.getItem("loggedInAdmin"));
}

// ═══════════════════════════════════
//   MEMBER FUNCTIONS
// ═══════════════════════════════════

// Same as your C++ deposit_money()
function depositMoney(amount) {
  amount = parseInt(amount);
  if (amount <= 0) return { success: false, msg: "Invalid amount!" };

  let member = getLoggedInMember();
  const real = members.find(m => m.id === member.id);
  real.balance += amount;

  // Save transaction
  const txns = getTransactions();
  txns.push({ sender_id: member.id, receiver_id: 0, sender_name: member.name, receiver_name: "CASH DEPOSIT", amount });
  saveTransactions(txns);
  saveMembers();

  // Update session
  member.balance = real.balance;
  sessionStorage.setItem("loggedInMember", JSON.stringify(member));

  return { success: true, balance: real.balance };
}

// Same as your C++ withdraw_money()
function withdrawMoney(amount) {
  amount = parseInt(amount);
  if (amount <= 0) return { success: false, msg: "Invalid amount!" };

  let member = getLoggedInMember();
  const real = members.find(m => m.id === member.id);
  if (amount > real.balance) return { success: false, msg: "Insufficient balance!" };

  real.balance -= amount;

  const txns = getTransactions();
  txns.push({ sender_id: member.id, receiver_id: 0, sender_name: member.name, receiver_name: "CASH WITHDRAWAL", amount });
  saveTransactions(txns);
  saveMembers();

  member.balance = real.balance;
  sessionStorage.setItem("loggedInMember", JSON.stringify(member));

  return { success: true, balance: real.balance };
}

// Same as your C++ transfer_money()
function transferMoney(receiver_id, amount) {
  receiver_id = parseInt(receiver_id);
  amount = parseInt(amount);

  let member = getLoggedInMember();
  if (receiver_id === member.id) return { success: false, msg: "Cannot transfer to your own account!" };

  const sender = members.find(m => m.id === member.id);
  const receiver = members.find(m => m.id === receiver_id);
  if (!receiver) return { success: false, msg: "Receiver account not found!" };
  if (amount <= 0) return { success: false, msg: "Invalid amount!" };
  if (amount > sender.balance) return { success: false, msg: "Insufficient balance!" };

  sender.balance -= amount;
  receiver.balance += amount;

  const txns = getTransactions();
  txns.push({ sender_id: sender.id, receiver_id: receiver.id, sender_name: sender.name, receiver_name: receiver.name, amount });
  saveTransactions(txns);
  saveMembers();

  member.balance = sender.balance;
  sessionStorage.setItem("loggedInMember", JSON.stringify(member));

  return { success: true, balance: sender.balance, receiverName: receiver.name };
}

// Same as your C++ apply_loan()
function applyLoan(amount) {
  amount = parseInt(amount);
  const member = getLoggedInMember();
  const loans = getLoans();

  // Check already applied
  const existing = loans.find(l => l.id === member.id);
  if (existing) return { success: false, msg: "You already have a pending loan application!" };

  loans.push({ name: member.name, id: member.id, amount });
  saveLoans(loans);
  return { success: true };
}

// Same as your C++ view_loan_status()
function viewLoanStatus() {
  const member = getLoggedInMember();
  const loans = getLoans();
  return loans.find(l => l.id === member.id) || null;
}

// Same as your C++ view_transaction_history()
function viewTransactionHistory() {
  const member = getLoggedInMember();
  const txns = getTransactions();
  return txns.filter(t => t.sender_id === member.id || t.receiver_id === member.id);
}

// Same as your C++ change_member_password()
function changePassword(current, newPass, confirmPass) {
  const member = getLoggedInMember();
  const real = members.find(m => m.id === member.id);

  if (real.password !== current) return { success: false, msg: "Current password is incorrect!" };
  if (current === newPass) return { success: false, msg: "New password cannot be same as old!" };
  if (newPass !== confirmPass) return { success: false, msg: "Passwords do not match!" };

  real.password = newPass;
  saveMembers();
  return { success: true };
}

// ═══════════════════════════════════
//   ADMIN FUNCTIONS
// ═══════════════════════════════════

// Same as your C++ create_member_account()
function createMember(name, id, password, balance) {
  id = parseInt(id); balance = parseInt(balance);
  const exists = members.find(m => m.id === id);
  if (exists) return { success: false, msg: "Account with this ID already exists!" };

  members.push({ name: name.toUpperCase(), id, password, balance });
  saveMembers();
  return { success: true };
}

// Same as your C++ delete_member_acc()
function deleteMember(id) {
  id = parseInt(id);
  const index = members.findIndex(m => m.id === id);
  if (index === -1) return { success: false, msg: "Member not found!" };

  members.splice(index, 1);
  saveMembers();
  return { success: true };
}

// Same as your C++ approve_loan_application()
function approveLoan(id) {
  id = parseInt(id);
  const loans = getLoans();
  const loanIndex = loans.findIndex(l => l.id === id);
  if (loanIndex === -1) return { success: false, msg: "Loan application not found!" };

  const member = members.find(m => m.id === id);
  if (!member) return { success: false, msg: "Member not found!" };

  member.balance += loans[loanIndex].amount;
  loans.splice(loanIndex, 1);
  saveLoans(loans);
  saveMembers();
  return { success: true };
}

// Same as your C++ reject_loan_application()
function rejectLoan(id) {
  id = parseInt(id);
  const loans = getLoans();
  const index = loans.findIndex(l => l.id === id);
  if (index === -1) return { success: false, msg: "Loan application not found!" };

  loans.splice(index, 1);
  saveLoans(loans);
  return { success: true };
}

function getAllMembers() { return members; }
function getAllLoans() { return getLoans(); }
function getAllTransactions() { return getTransactions(); }
function searchById(id) { return members.find(m => m.id === parseInt(id)) || null; }
function searchByName(name) { return members.find(m => m.name === name.toUpperCase()) || null; }