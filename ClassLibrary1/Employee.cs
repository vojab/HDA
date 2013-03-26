﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Models
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

    [DataContract]
    public class EmployeesDisplayModel
    {
        [DataMember]
        public IEnumerable<Employee> Employees { get; set; }
    }
}