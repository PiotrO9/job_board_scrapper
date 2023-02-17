function PrepareExperienceAndRequirementsQuery(seniority, requirements, page = 1) {
    let result = "https://nofluffjobs.com/pl/";
    let requirementsArray = []

    if(requirements.includes(",")) {
        requirementsArray = requirements.split(",");
        result += requirementsArray[0]
    }
    else {
        result += requirements
    }

    result += "?page=" + page.toString();
    result += "&criteria=seniority%3D" + seniority;

    if(requirementsArray != []) {
        result += "%20requirement%3D";
        for(let i = 1 ; i <requirements.length ; i++) {
            result += requirementsArray[i] + ","
        }
        result = result.slice(0, -1)
    }

    return result
}

module.exports = PrepareExperienceAndRequirementsQuery