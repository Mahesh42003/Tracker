const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


const mongoURI = 'mongodb+srv://Mahi123:lJy20HGE02NzIBdZ@cluster0.jf4gnyu.mongodb.net/Transcations';

mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));
const transactionSchema = new mongoose.Schema({
    type: { type: String, enum: ['income', 'expense'], required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String }
});
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    type: { type: String, enum: ['income', 'expense'], required: true }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
const Category = mongoose.model('Category', categorySchema);
// POST /transactions
app.post('/transactions', (req, res) => {
    const { type, category, amount, date, description } = req.body;
    const newTransaction = new Transaction({ type, category, amount, date, description });

    newTransaction.save()
        .then(transaction => {
            console.log('Transaction saved:', transaction); // Log the saved transaction
            res.status(201).json(transaction);
        })
        .catch(err => {
            console.error('Error saving transaction:', err.message); // Log any errors
            res.status(400).json({ error: err.message });
        });
});

app.get('/transactions', (req, res) => {
    Transaction.find()
        .then(transactions => res.json(transactions))
        .catch(err => res.status(500).json({ error: err.message }));
});

// GET /transactions/:id
app.get('/transactions/:id', (req, res) => {
    const { id } = req.params;
     
    Transaction.findById(id)
        .then(transaction => {
            if (!transaction) {
                return res.status(404).json({ error: 'Transaction not found' });
            }
            res.json(transaction);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});
app.put('/transactions/:id', (req, res) => {
    const { id } = req.params; 
    const { type, category, amount, date, description } = req.body;

    Transaction.findByIdAndUpdate(id, { type, category, amount, date, description }, { new: true })
        .then(transaction => {
            if (!transaction) {
                return res.status(404).json({ error: 'Transaction not found' });
            }
            res.json(transaction);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// DELETE /transactions/:id
app.delete('/transactions/:id', (req, res) => {
    const { id } = req.params;

    Transaction.findByIdAndDelete(id)
        .then(transaction => {
            if (!transaction) {
                return res.status(404).json({ error: 'Transaction not found' });
            }
            res.json({ message: 'Transaction deleted' });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// GET /summary
app.get('/summary', (req, res) => {
    Transaction.aggregate([
        {
            $group: {
                _id: "$type",
                total: { $sum: "$amount" }
            }
        }
    ])
    .then(results => {
        const summary = {
            totalIncome: results.find(r => r._id === 'income')?.total || 0,
            totalExpenses: results.find(r => r._id === 'expense')?.total || 0,
            balance: (results.find(r => r._id === 'income')?.total || 0) - (results.find(r => r._id === 'expense')?.total || 0)
        };
        res.json(summary);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
