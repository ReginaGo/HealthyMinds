function toggleAnswer(index) {
    const answer = document.getElementById(`answer-${index}`);
    
    // Cambia el estilo display entre 'none' y 'block'
    if (answer.style.display === "block") {
        answer.style.display = "none";
    } else {
        answer.style.display = "block";
    }
}
