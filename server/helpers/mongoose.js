module.exports = {
    normalizeErrors: function(errors){

        let normalizeErrors =[];
        for(let prop in errors){
            if(errors.hasOwnProperty(prop)){
                console.log(prop, errors[prop]);
                normalizeErrors.push({'title': prop, 'errors': errors[prop].message})
            }
        }
        return normalizeErrors;
    }
};