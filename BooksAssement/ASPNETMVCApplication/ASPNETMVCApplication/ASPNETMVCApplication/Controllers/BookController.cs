using System;
using System.Web;
using System.Linq;
using System.Web.Mvc;
using ASPNETMVCApplication.Models;

namespace ASPNETMVCApplication.Controllers
{
    public class BookController : Controller
    {
        BookDBContext _db = new BookDBContext(); 

        //
        // GET: /Book/

        public ActionResult Index()
        {
            var books = from book in _db.Books
                        select book;

            return View(books.ToList());
        }

        //
        // GET: /Book/Details/5

        public ActionResult Details(int au_id)
        {
            Book book = _db.Books.Find(au_id);

            if (book == null)
                return RedirectToAction("Index");

            return View("Details", book); 
        }

        //
        // GET: /Book/Create

        public ActionResult Create()
        {
            return View();
        } 

        //
        // POST: /Book/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            
                Book book = new Book();
                if (ModelState.IsValau_id)
                {                    
                    book.au_lname = collection["au_lname"].ToString();
                    book.au_fname = collection["au_fname"].ToString();
                    book.phone = Convert.ToDecimal(collection["phone"]);
                    book.au_lname = collection["address"].ToString();
                    book.au_fname = collection["city"].ToString();
                    book.au_lname = collection["state"].ToString();
                    book.au_fname = collection["zip"].ToString();
                    book.au_fname = collection["contract"].ToString();
                

                _db.Books.Add(book);
                    _db.SaveChanges(); 

                    return RedirectToAction("Index");
                }
                else
                {
                    return View(book);
                }
                    
        }
        
        //
        // GET: /Book/Edit/5
 
        public ActionResult Edit(int au_id)
        {
            Book book = _db.Books.Find(au_id);
            if (book == null)
                return RedirectToAction("Index");

            return View(book); 
        }

        //
        // POST: /Book/Edit/5

        [HttpPost]
        public ActionResult Edit(int au_id, FormCollection collection)
        {
            try
            {
                var book = _db.Books.Find(au_id);

                UpdateModel(book);
                _db.SaveChanges();               
 
                return RedirectToAction("Index");
            }
            catch
            {
                ModelState.AddModelError("", "Edit Failure, see inner exception");
                return View();
            }
        }

        //
        // GET: /Book/Delete/5
 
        public ActionResult Delete(int au_id)
        {
            Book book = _db.Books.Find(au_id);
            if (book == null)
                return RedirectToAction("Index");
            return View(book);
        }

        //
        // POST: /Book/Delete/5

        [HttpPost]
        public ActionResult Delete(int au_id, FormCollection collection)
        {
            Book book = _db.Books.Find(au_id);
            _db.Books.Remove(book);
            _db.SaveChanges();

            return RedirectToAction("Index"); 
        }
    }
}
