using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Serialization;
using System.Web.Http;
using Models;
using Newtonsoft.Json;


namespace FIT.HDA.API.Controllers
{
    public class EmployeeAPIController : ApiController
    {
        private readonly List<Employee> _employeeList = new List<Employee>();

        public EmployeeAPIController()
        {
            _employeeList.Add(new Employee(1, "Employee1", "Employee Department1", 9999888877));
            _employeeList.Add(new Employee(2, "Employee2", "Employee Department2", 7777888899));
            _employeeList.Add(new Employee(3, "Employee3", "Employee Department3", 9999777788));
        }

        // GET api/EmployeeAPI
        [HttpGet]
        public EmployeesDisplayModel GetEmployees()
        {
            //return _employeeList;
            return new EmployeesDisplayModel { Employees = _employeeList };
        }

        // GET api/EmployeeAPI/5
        public Employee GetEmployee(int id)
        {
            return _employeeList.Find(e => e.EmployeeId == id);

        }

        // POST api/EmployeeAPI
        public IEnumerable<Employee> Post(Employee value)
        {
            _employeeList.Add(value);

            return _employeeList;
        }

        // PUT api/EmployeeAPI/5
        public void Put(int id, string value)
        {

        }

        // DELETE api/EmployeeAPI/5
        public IEnumerable<Employee> Delete(int id)
        {
            _employeeList.Remove(_employeeList.Find(E => E.EmployeeId == id));
            return _employeeList;
        }
    }
}
