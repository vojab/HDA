using System.Collections.Generic;
using System.Linq;
using FIT.HDA.Models;
using FIT.HDA.BL.Enums;

namespace FIT.HDA.DAL.Repositories
{
    public class ProductRepository
    {
        private readonly HelpDeskDbContext _context;
        public ProductRepository()
        {
            _context = new HelpDeskDbContext();
        }

        public IEnumerable<Product> GetAll()
        {
            return _context.Products.Where(r => r.ProductStatus != (int)HelpDeskEnums.Status.Deleted).AsEnumerable();
        }

        public void SaveProduct(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
        }

        //public void DeleteProduct(int productId)
        //{
        //    var product = _context.Products.
        //        FirstOrDefault(r => r.ProductId == productId);

        //    _context.Products.Remove(product);

        //    _context.SaveChanges();
        //}

        // Method doesn not delete product but only update product status to Deleted - 0
        public void DeleteProduct(int productId)
        {
            var product = _context.Products.First(r => r.ProductId == productId);

            if (product != null)
            {
                product.ProductStatus = (int)HelpDeskEnums.Status.Deleted;

                _context.SaveChanges();
            }
        }

        public void Dispose()
        {
            if (_context != null)
                _context.Dispose();
        }
    }
}
