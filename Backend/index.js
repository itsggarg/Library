const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port= 3000
const app = express();

app.use(cors({
  origin:["https://library-management-system-lovat-nu.vercel.app/"],
  methods:["POST","GET"],
  credentials:true
}));
app.use(bodyParser.json());

main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb+srv://ashif:Ashif@786@1234@cluster0.q7r9p4z.mongodb.net/LibManSys?retryWrites=true&w=majority&appName=Cluster0');
//   console.log("Connected to MongoDB");
// }

// const User = mongoose.model('User', new mongoose.Schema({
//   username: String,
//   password: String,
//   bookBorrow: [
//     {
//       bookname: String,
//       Due_Date: String,
//       fine: Number
//     }
//   ]
// }));


// const exampleUser = new User({
//   username: 'user2',
//   password: 'user',
//   bookBorrow: [
//     {
//       bookname: 'Example Book 1',
//       Due_Date: '2024-04-04',
//       fine: 0
//     },
//     // {
//     //   bookname: 'Example Book 2',
//     //   Due_Date: '2024-04-15',
//     //   fine: 0
//     // }
//   ]
// });

// // exampleUser.save().then(()=>console.log("succesfully saved")).catch(err=>console.log(err))

// const BookDetails = mongoose.model('Books', new mongoose.Schema({
//   bookname: String,
//   author: String,
//   number_of_copies: Number,
//   borrower: [String]
// }));

// const ReqBook = mongoose.model('reqBooks',new mongoose.Schema({
//   bookname: String,
//   author: String,
//   number_of_request: Number
// }))



// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username, password });
//     if (user) {
//       user.bookBorrow.forEach(borrow => {
//         const dueDate = new Date(borrow.Due_Date);

//         const today = new Date();
//         const differenceInTime = today.getTime() - dueDate.getTime();

//         const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

//         if (differenceInDays > 1) {
//           borrow.fine = (differenceInDays - 1) * 5;
//         } else {
//           borrow.fine = 0;
//         }
//       });
//       await user.save();
//       res.status(200).json({ message: 'Login successful', borrowedBooks: user.bookBorrow });
//     } else {
//       res.status(401).json({ message: 'Invalid username or password' });
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post('/signup', (req, res) => {
//   const { username, password } = req.body;

//   // Check if the user already exists
//   User.findOne({ username: username })
//     .then(existingUser => {
//       if (existingUser) {
//         // If user already exists, return a 401 status with a message
//         return res.status(401).json({ message: "User with this username already exists" });
//       } else {
//         // If user doesn't exist, create a new user
//         const user = new User({
//           username: username,
//           password: password,
//           bookBorrow: []
//         });

//         // Save the new user
//         user.save()
//           .then(() => {
//             console.log("User successfully saved");
//             res.sendStatus(200); // Send success status back to the client
//           })
//           .catch(error => {
//             console.error("Error saving user:", error);
//             res.sendStatus(500); // Send error status back to the client
//           });
//       }
//     })
//     .catch(error => {
//       console.error("Error finding user:", error);
//       res.sendStatus(500); // Send error status back to the client
//     });
// });


// app.get('/books', async (req, res) => {
//   try {
//     const books = await BookDetails.find();
//     if (books.length > 0) {
//       res.send({ books: books });
//     } else {
//       res.send({ message: "No books available" });
//     }
//   } catch (error) {
//     console.error("Error fetching books:", error);
//     res.status(500).send({ message: "Internal server error" });
//   }
// });

// app.post('/issueBook', async (req, res) => {
//   const { username, book } = req.body;

//   try {
//     const user = await User.findOne({ username: username });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (user.bookBorrow.length >= 2) {
//       return res.status(400).json({ message: "You can't borrow more than 2 books" });
//     }

//     const issueBook = await BookDetails.findOne({ bookname: book.bookname });
//     if (!issueBook || issueBook.number_of_copies === 0) {
//       return res.json({ message: "Book not available for borrowing",books:user.bookBorrow });
//     }

//     issueBook.number_of_copies--;
//     issueBook.borrower.push(username.toString());
//     await issueBook.save();

//     const currentDate = new Date();
//     currentDate.setDate(currentDate.getDate() + 7);
//     const dueDate = currentDate.toISOString().split('T')[0];

//     user.bookBorrow.push({
//       bookname: book.bookname,
//       Due_Date: dueDate,
//       fine: 0,
//       username:username.toString()
//     });
//     await user.save();

//     res.status(200).json({ message: 'Book issued successfully', books: user.bookBorrow });
//   } catch (error) {
//     console.error('Error issuing book:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// app.post('/returnBook', async (req, res) => {
//   const { username, book } = req.body;
//   try {
//     const user = await User.findOne({ username: username });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const updatedBookBorrow = user.bookBorrow.filter(borrow => borrow.bookname !== book.bookname);
//     user.bookBorrow = updatedBookBorrow;
//     await user.save();
//     const issueBook = await BookDetails.findOne({ bookname: book.bookname });

//     issueBook.number_of_copies++;
//     issueBook.borrower.pull(username);
//     await issueBook.save();

//     res.status(200).json({ message:"Succesfully Return",books: user.bookBorrow });
//   } catch (error) {
//     console.error('Error returning book:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });





// app.post('/reqBook', async (req, res) => {
//   const { bookname, author } = req.body;
//   try {
//     const existingBook = await BookDetails.findOne({ bookname: bookname });
//     if (existingBook) {
//       return res.status(200).json({ message: "Book is already available in Library", book: existingBook });
//     }

//     const requestedBook = await ReqBook.findOne({ bookname: bookname, author: author });
//     if (requestedBook) {
//       requestedBook.number_of_request += 1;
//       await requestedBook.save();
//       return res.status(200).json({ message: "Book request count updated", book: requestedBook });
//     } else {
//       const newReqBook = new ReqBook({
//         bookname: bookname,
//         author: author,
//         number_of_request: 1
//       });
//       const savedBook = await newReqBook.save();
//       return res.status(200).json({ message: "Book request added", book: savedBook });
//     }
//   } catch (error) {
//     console.error("Error adding/updating book:", error);
//     return res.status(500).json({ message: "Failed to add/update book request" });
//   }
// });



// app.post("/userBooks", async (req, res) => {
//   const { username } = req.body;

//   try {
//     const user = await User.findOne({ username: username });
//     if (user) {
//       res.status(200).json({ books: user.bookBorrow });
//     } else {
//       res.json({ message: "User not found",books:[] });
//     }
//   } catch (error) {
//     console.error("Error fetching user books:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.post('/books',async(req,res)=>{
//   const {bookName}=req.body;
//   try{
//     const book= await BookDetails.findOne({bookname:bookName});
//     if(book){
//       res.status(200).json({books:book})
//     }else{
//       res.status(400).json({message:"No book found"})
//     }
//   }catch{
//     console.log("error in fetching");
//   }
// })

// app.get('/getReqBooks',async(req,res)=>{
//   try{
//     const books = await ReqBook.find();
//     if(books){
//       res.status(200).json({books:books});
//     }else{
//       res.status(400).json({messsage:"No book found"})
//     }
//   }catch{
//     console.log("Error in fetching");
//   }
  
// })

// app.post('/delReqBooks', async (req, res) => {
//   const { book } = req.body;
//   try {
//     // Delete the requested book
//     const delBook = await ReqBook.deleteOne({ _id: book._id });
//     // Fetch all remaining books after deletion
//     const allBooks = await ReqBook.find();
//     // Filter out the deleted book from the list
//     const updatedBooks = allBooks.filter(b => b._id.toString() !== book._id);
    
//     // Respond to the client after deleting the book and updating the list
//     res.status(200).json({ message: "Book deleted successfully", books: updatedBooks });

//     // Save the deleted book to the library
//     const newBook = new BookDetails({
//       bookname: book.bookname,
//       author: book.author,
//       number_of_copies: book.number_of_request
//     });
//     await newBook.save(); // Wait for saving to finish
//     console.log("saved successfully in db");
//   } catch (error) {
//     console.error("Error deleting book:", error);
//     res.status(500).json({ message: "Failed to delete book" });
//   }
// });



app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(port, () => console.log("Server ready on port 3000."));
