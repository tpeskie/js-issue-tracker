function fetchIssues () {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = $('#issuesList');
    
    issuesList.html('');
    
    issues.forEach(ticket => {
        let action = (ticket.status == 'Open') ? 'Close' : 'Re-open';
        issuesList.append( `<div class="well" id="${ticket.id}">
                            <h6>Issue ID: ${ticket.id} </h6>
                            <p><span class="label label-info"> ${ticket.status} </span></p>
                            <h3> ${ticket.description} </h3>
                            <p><span class="glyphicon glyphicon-time"></span> ${ticket.severity} 
                            <span class="glyphicon glyphicon-user"></span> ${ticket.assignedTo} </p>
                            <a href="#" class="btn btn-warning" onclick="setStatus('${ticket.id}', '${action}')">${action}</a>
                            <a href="#" class="btn btn-danger" onclick="deleteIssue('${ticket.id}')">Delete</a>
                            </div>`
        );
    })
}

$('#issueInputForm').on('submit', saveIssue);

function saveIssue(e) {
    let issueId = chance.guid(),
        issueDesc = $('#issueDescInput').val(),
        issueSeverity = $('#issueSeverityInput').val(),
        issueAssignedTo = $('#issueAssignedToInput').val(),
        issueStatus = 'Open';
    var issue = {
      id: issueId,
      description: issueDesc,
      severity: issueSeverity,
      assignedTo: issueAssignedTo,
      status: issueStatus
    }
    

    const issues = JSON.parse(localStorage.getItem('issues')) || [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    
    document.getElementById('issueInputForm').reset();
   
    fetchIssues();
    
    e.preventDefault(); 
}

function setStatus (id, action) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    const status = action == 'Close' ? 'Closed' : 'Open';
    issues.some(ticket => 
        (ticket.id != id) ? false : ticket.status = status, true
    );
      
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
}

function deleteIssue (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    let deleted = issues.findIndex(ticket=> ticket.id == id);
    issues.splice(deleted, 1);
    
    
    
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
}