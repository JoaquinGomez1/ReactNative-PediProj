const userRoles = [
  { uid: "rf0InNpFlIegjJ80DK3c13s4yda2", role: "admin" },
  { uid: "8BzpgweJupUXPtFlo40SJlgc4xz1", role: "admin" },
  { uid: "rf0InNpFlIegjJ80DK3c13s4yda2", role: "admin" },
];

const isAuthorized = (user: firebase.default.User, role: string) => {
  const userFound = userRoles.find((x) => x.uid === user.uid);
  if (userFound && userFound.role === role) return true;

  return false;
};

export default isAuthorized;
