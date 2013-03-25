using System;

namespace Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }

        public string EmployeeName { get; set; }

        public string EmployeeDepartment { get; set; }

        public Int64 EmployeeMobile { get; set; }

        public Employee(int employeeId, string employeeName, string employeeDepartment, Int64 employeeMobile)
        {
            EmployeeId = employeeId;
            EmployeeName = employeeName;
            EmployeeDepartment = employeeDepartment;
            EmployeeMobile = employeeMobile;
        }
    }
}