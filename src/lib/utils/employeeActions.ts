// utils/employeeActions.ts

export const getEmployees = (): any[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("employees");
  return stored ? JSON.parse(stored) : [];
};

export const saveEmployees = (data: any[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("employees", JSON.stringify(data));
  }
};

export const deleteEmployee = (idEmployee: string) => {
  const list = getEmployees();
  const filtered = list.filter((emp) => emp.idEmployee !== idEmployee);
  saveEmployees(filtered);
  return filtered;
};
