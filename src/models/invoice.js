const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema({
	products: {
		type: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: "Product",
				},
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
		require: true,
	},
	client: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
		ref: "User",
	},
	total: {
		type: Number,
		require: true,
	},
});

module.exports = mongoose.model("Invoice", invoiceSchema);