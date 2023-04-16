async function ScraperWithCriterias(data) {
    let linkWithCriterias = "https://nofluffjobs.com/pl/";
    let keyWords = [];
    let atLeastOneCriteria = false

    if(data.Title) {
        if(data.Title.indexOf(' ') > 0) {
            keyWords = data.Title.split(" ");        
        }
        
        linkWithCriterias += data.Title;

        if(data.Location) {
            linkWithCriterias += "/" + data.Location;
        }
    }
    else {
        if(data.Location) {
            linkWithCriterias += data.Location;
        }
    }

    linkWithCriterias += "?page=1";

    linkWithCriterias += "&criteria=";

    if(data.Criterias.Experience.length > 0) {
        if(atLeastOneCriteria) {
            linkWithCriterias += "%20seniority%3D";
        }
        else {
            atLeastOneCriteria = true;
            linkWithCriterias += "seniority%3D";
        }

        for (let i = 0; i < data.Criterias.Experience.length; i++) {
            linkWithCriterias += data.Criterias.Experience[i];
            if(i + 1 != data.Criterias.Experience.length) {
                linkWithCriterias += ",";
            }
        }
    }

    if(data.Criterias.ContractType.length > 0) {
        if(atLeastOneCriteria) {
            linkWithCriterias += "%20employment%3D";
        }
        else {
            atLeastOneCriteria = true;
            linkWithCriterias += "employment%3D";
        }

        for (let i = 0; i < data.Criterias.ContractType.length; i++) {
            linkWithCriterias += data.Criterias.ContractType[i];
            if(i + 1 != data.Criterias.ContractType.length) {
                linkWithCriterias += ",";
            }
        }
    }

    if(keyWords.length > 1) {
        if(atLeastOneCriteria) {
            linkWithCriterias += "%20keyword%3D";
        }
        else {
            atLeastOneCriteria = true;
            linkWithCriterias += "keyword%3D";
        }

        for (let i = 1; i < keyWords.length; i++) {
            linkWithCriterias += keyWords[i];
            if(i + 1 != keyWords.length) {
                linkWithCriterias += ",";
            }
        }
    }

    if(data.Salary && data.Salary.min != 0 && data.Salary.max != 50000) {
        if(atLeastOneCriteria) {
            linkWithCriterias += `%20salary>${data.Salary.min}pln`;
            linkWithCriterias += `%20salary<${data.Salary.max}pln`;
        }
        else {
            linkWithCriterias += `salary>pln${data.Salary.min}`;
            linkWithCriterias += `%20salary<pln${data.Salary.max}`;
        }
    }

    return linkWithCriterias;
}

module.exports = ScraperWithCriterias