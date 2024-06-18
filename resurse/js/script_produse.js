//script.js 
const ceasuriPerPage = 6; // Number of cards to show per page 
const dataContainer = document.getElementById('produse'); 
const pagination = document.getElementById('pagination'); 
const prevButton = document.getElementById('prev'); 
const nextButton = document.getElementById('next'); 
const pageNumbers = document.getElementById('page-numbers'); 
const pageLinks = document.querySelectorAll('.page-link'); 

const ceasuri = 
	Array.from(dataContainer.getElementsByClassName('produs')); 

// Calculate the total number of pages 
const totalPages = Math.ceil(ceasuri.length / ceasuriPerPage); 
let currentPage = 1; 

// Function to display cards for a specific page 
function displayPage(page) { 
	const startIndex = (page - 1) * ceasuriPerPage; 
	const endIndex = startIndex + ceasuriPerPage; 
	ceasuri.forEach((produs, index) => { 
		if (index >= startIndex && index < endIndex) { 
			produs.style.display = 'block'; 
		} else { 
			produs.style.display = 'none'; 
		} 
	}); 
} 

// Function to update pagination buttons and page numbers 
function updatePagination() { 
	pageNumbers.textContent = 
		`Page ${currentPage} of ${totalPages}`; 
	prevButton.disabled = currentPage === 1; 
	nextButton.disabled = currentPage === totalPages; 
	pageLinks.forEach((link) => { 
		const page = parseInt(link.getAttribute('data-page')); 
		link.classList.toggle('active', page === currentPage); 
	}); 
} 

// Event listener for "Previous" button 
prevButton.addEventListener('click', () => { 
	if (currentPage > 1) { 
		currentPage--; 
		displayPage(currentPage); 
		updatePagination(); 
	} 
}); 

// Event listener for "Next" button 
nextButton.addEventListener('click', () => { 
	if (currentPage < totalPages) { 
		currentPage++; 
		displayPage(currentPage); 
		updatePagination(); 
	} 
}); 

// Event listener for page number buttons 
pageLinks.forEach((link) => { 
	link.addEventListener('click', (e) => { 
		e.preventDefault(); 
		const page = parseInt(link.getAttribute('data-page')); 
		if (page !== currentPage) { 
			currentPage = page; 
			displayPage(currentPage); 
			updatePagination(); 
		} 
	}); 
}); 

// Initial page load 
displayPage(currentPage); 
updatePagination();
