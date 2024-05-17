// AcademicYearManager.js

// Function to fetch academic year from an API
async function fetchAcademicYear() {
    try {
      const response = await fetch(`http://localhost:9090/api/AssistantRegistrar/getAcademicYearDetails`); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
      return data[0].current_academic_year; // Assuming the API returns an object with an 'academicYear' property
    } catch (error) {
      console.error('Error fetching academic year:', error);
      return null;
    }
  }
  
  // Function to save academic year to local storage
  function saveAcademicYearToLocal(current_academic_year) {

    localStorage.setItem('academicYear', JSON.stringify(current_academic_year));
  }
  
  // Function to load academic year from local storage
  function loadAcademicYearFromLocal() {
    const storedAcademicYear = localStorage.getItem('current_academic_year');
    if (storedAcademicYear) {
      return JSON.parse(storedAcademicYear);
    }
    return null;
  }
  
  // Exporting the functions so they can be used elsewhere in your app
  export { fetchAcademicYear, saveAcademicYearToLocal, loadAcademicYearFromLocal };
  