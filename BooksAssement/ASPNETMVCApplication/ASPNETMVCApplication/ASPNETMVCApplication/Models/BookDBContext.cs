using System;
using System.Web;
using System.Data.Entity;

namespace ASPNETMVCApplication.Models
{
    public class BookDBContext:DbContext
    {
        public DbSet<Book> Books { get; set; } 
    }
}