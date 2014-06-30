//--------------------
// Make sure cells are same icon
var case0 = {

	// Make sure both cells are actually same type of icon
	test: function(first,second) {
		// If either id has matched 
		if (first.solved === true || second.solved === true)
			return false;
		return (first.id === second.id) ? true : false;
	}
};