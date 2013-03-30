using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace FIT.HDA.Models
{
    [DataContract]
    public class Employee
    {
        [DataMember]
        public int EmployeeId { get; set; }

        [DataMember]
        public string EmployeeName { get; set; }

        [DataMember]
        public string EmployeeDepartment { get; set; }

        [DataMember]
        public Int64 EmployeeMobile { get; set; }

        public Employee(int employeeId, string employeeName, string employeeDepartment, Int64 employeeMobile)
        {
            EmployeeId = employeeId;
            EmployeeName = employeeName;
            EmployeeDepartment = employeeDepartment;
            EmployeeMobile = employeeMobile;
        }
    }

    public class EmployeeDisplayModel
    {
        public List<Employee> Employee { get; set; }
    }
}