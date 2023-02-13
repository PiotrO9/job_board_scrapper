async function ScraperWithCriterias(data) {
    let linkWithCriterias = "https://nofluffjobs.com/pl/";
    let keyWords = [];
    let atLeastOneCriteria = false

    if(data.Title != null) {
        if(data.Title.indexOf(' ') > 0) {
            keyWords = data.Title.split(" ");
            linkWithCriterias += keyWords[0];
            
            if(data.Location != null) {
                linkWithCriterias += "/" + data.Location;
            }
        }
    }

    if(data.Location != null) {
        linkWithCriterias += data.Location;
    }

    linkWithCriterias += "?page=1";

    linkWithCriterias += "&criteria=";

    if(data.Criterias.Experience != []) {

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

    if(data.Criterias.ContractType != null) {
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

    if(keyWords != []) {
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

    if(Salary) {
        if(atLeastOneCriteria) {
            linkWithCriterias += ""; 
        }
        else {
            linkWithCriterias += 
        }
    }

    return linkWithCriterias;
}