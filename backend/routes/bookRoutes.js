
import express from "express";


import { Book } from "../models/bookModel.js";
const route = express.Router();


route.post("/", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: "send all required fields: title, author, publishYear",
        });
      }
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
  
      const book = await Book.create(newBook);
  
      return response.status(201).send(book);
    } catch (error) {
      console.log(error);
      response.status(500).send({ message: error.message });
    }
  });
  
  //getting the list of all books
  route.get("/", async (request, response) => {
    try {
      const books = await Book.find({});
      return response.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  //getting a book by its id as param
  route.get("/:id", async (request, response) => {
    try {
      const { id } = request.params;
  
      const book = await Book.findById(id);
  
      return response.status(200).json({ book });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  //route for updating a Book
  route.put("/:id", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: "send all required fields: title, author, publishYear",
        });
      }
  
      const { id } = request.params;
  
      const result = await Book.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: "Book not found" });
      } else {
        return response
          .status(200)
          .send({ message: "Book updated successfully" });
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  //route to delete a book
  route.delete("/:id", async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await Book.findByIdAndDelete(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: "Book not found" });
      } else {
        return response
          .status(200)
          .send({ message: "Book deleted successfully" });
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

 export default route;