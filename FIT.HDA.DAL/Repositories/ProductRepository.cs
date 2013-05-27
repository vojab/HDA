using System.Collections.Generic;
using System.Linq;
using FIT.HDA.Models;

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
            return _context.Products.AsEnumerable();
        }

        public void SaveProduct(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
        }

        public void DeleteProduct(int productId)
        {
            var product = _context.Products.
                FirstOrDefault(r => r.ProductId == productId);

            _context.Products.Remove(product);

            _context.SaveChanges();
        }

        public void Dispose()
        {
            if (_context != null)
                _context.Dispose();
        }
    }
}
