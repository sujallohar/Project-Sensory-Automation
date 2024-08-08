document.addEventListener('DOMContentLoaded', function() {
    var feedbackData = JSON.parse(localStorage.getItem('feedbackData')) || [];

    if (feedbackData.length === 0) {
        alert('No feedback data available.');
        return;
    }

    var aggregatedData = {};

    feedbackData.forEach(function(entry) {
        if (!aggregatedData[entry.itemName]) {
            aggregatedData[entry.itemName] = {
                appearance: 0,
                flavor: 0,
                taste: 0,
                count: 0
            };
        }

        aggregatedData[entry.itemName].appearance += entry.appearance;
        aggregatedData[entry.itemName].flavor += entry.flavor;
        aggregatedData[entry.itemName].taste += entry.taste;
        aggregatedData[entry.itemName].count += 1;
    });

    var resultsTableBody = document.querySelector('#resultsTable tbody');
    resultsTableBody.innerHTML = '';

    for (var itemName in aggregatedData) {
        var data = aggregatedData[itemName];
        var averageAppearance = (data.appearance / data.count).toFixed(2);
        var averageFlavor = (data.flavor / data.count).toFixed(2);
        var averageTaste = (data.taste / data.count).toFixed(2);
        var totalScore = (data.appearance + data.flavor + data.taste);

        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${itemName}</td>
            <td>${averageAppearance}</td>
            <td>${averageFlavor}</td>
            <td>${averageTaste}</td>
            <td>${totalScore}</td>
        `;
        resultsTableBody.appendChild(row);
    }
});
