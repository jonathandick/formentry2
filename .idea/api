var formEntryService = {
    questionMap: {}, //Links schema question, model and formly field. key = determined by modelType; value = object of {field:field,model:model,question:question}.
    getFormSchema : function(formName,callback){},
    schemaToFormlyForm : function(schema){},
    questionsToFormlyFields : function(questions,fields,model,questionMap){},
    insertIntoFormlyFields: function(index,question,fields,model,questionMap) {},
    getFieldById: function(id,questionMap){},
    populateFormWithExistingData: function(modelTypes,existingData){}, //allow each modelType to populate form model with existing data
    validateForm: function() {},
    getFormSections: function(){},
    createForm: function(){},
    addToReadyFields: function(){},

};

var validationService = {
    addFieldToValidationMetaData: function(){},
    getConditionalValidationParams: function() {},
    extractQuestionIds: extractQuestionIds,
    replaceQuestionsPlaceholdersWithValue: replaceQuestionsPlaceholdersWithValue,
    replaceMyValuePlaceholdersWithActualValue: replaceMyValuePlaceholdersWithActualValue,
    evaluateExpression: evaluateExpression,
    getFieldValueToValidate: getFieldValueToValidate,
    getFieldValidator: getFieldValidatorObject,
    getFieldValidators: getFieldValidators,
    getHideDisableExpressionFunction: getHideDisableExpressionFunction,
    getConditionalRequiredExpressionFunction: getConditionalRequiredExpressionFunction,
    getConditionalAnsweredValidatorObject: getConditionalAnsweredValidatorObject,
    getDateValidatorObject: getDateValidatorObject,
    getJsExpressionValidatorObject: getJsExpressionValidatorObject,
    getHideDisableExpressionFunction_JS: getHideDisableExpressionFunction_JS,
    addToListenersMetadata: addToListenersMetadata,
    updateListeners: updateListeners
}

var encounterModelType = {
    populateFormWithEncounter: function(form,restObs){},
    populateModelWithEncounter: function(model,payloadEncounter,questionMap){},
    toFormlyField: function() {},
    createPayload: function() {},
    updatePayload: function() {},
    createPayloadFromForm: function() {},
}

var obsModelType = {
    toFormlyField: function() {},
    populateFormWithObs : function(form,restObs){},
    populateModelWithObs: function(model,payloadObs,questionMap){},
    getObsValue: function(key,obs){},
    getObsGroupValue : function(key,obs){},
    findValuesToVoid : function(){},
    getInitialFieldValue : function(key){},
    createPayload: function() {},
    createPayloadObsGroup: function() {},
    createPayloadObsArray: function() {},
    createPayloadObsGroupArray: function(){},
    updatePayload: function() {}
}