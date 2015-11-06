
var modelType = {
	createFormlyField: function(schemaQuestion) {

	}
	setModelValue: function(model,schemaQuestion) {},
	getModelValue: function(model,schemaQuestion) {},
};

var modelTypes =
{
	"modelType": modelType
};

schema rules
0. A question can on be asked once on a common level of a particular branch. In other words, you can not ask, "Are you on ARVs?" in more than one place on the form unless the question is nested within another question (and that question does not already ask the question).
1. A question can be asked have multiple answers only if it is of an appropriate type, e.g. "group_repeating", "multi-checkbox"
2. A question can have unlimited levels of nested questions. 




model = {obs :
	{
		"key1": {concept:"uuid",value:"value"},
		"key2": {
					concept:"uuid2",
					obsGroup: {
					}
				}
	}



//each uuid only allowed to occur once per level.
//for convenience, make each key point to an array. if the schema allows, this will have multiple objects, or just one if not allowed to //repeat.
function obsTypeToFormlyField(question,model) {
	var key = 'value';
	var field = {};
	var m = {concept:question.concept,schemaQuestion: question, formlyField:field};
	if("questions" in question) {
		m.obsGroup = {};
	}

	if(question.concept in model) { //add m to the array
		model[question.concept].push(m);
	}
	else { //create array with just m
		model[question.concept] = [m];
	}

	field = {
		key:key,
		model:m
	}

	field.recursiveModel = m.obsGroup;

	return field;
}

function questionsToFormlyFields(questions,fields,model) {
	_.each(questions,function(question) {
		var field = getField(question,model); //this will call obsTypeToFormlyField
		fields.push(field);
		if("questions" in question) {
			//the last model will be the one just created
			//!!this is specific to obs implementation

			questionsToFormlyField(question.questions,fields,field.recursiveModel);
		}
	}
}


function schemaToModel(schema) {
	var schemaModel = [];
	_.each(schema.pages,function(page) {
		_.each(page.sections,function(section) {
			var sectionModel = {};
			questionsToModel(section.questions,sectionModel);
			schemaModel.push(sectionModel);
		}
	}
}


model = {obs :
	{
		"key1": {concept:"uuid",obsId:12,value:"12",initialValue:"120","schemaQuestion":question,"formlyField":field},
		"key2": {
					concept:"uuid2", //problably want a field like "hasData" which is set when any question in the obsGroup gets a
									 // value. this can be used to more quickly find obsGroups that need to be put in the payload
					obsGroup: {
					}
				}

	}

//uses question.type to determine if this can be asked more than once.
function allowsRepeating(question) {

}

//A question may only be asked once per section. It may be allowed to have multiple answers.
//This means that we can use the concept uuid as the key and in the model, use an array to hold moultiple answers.
//OpenMRS does not support ordering to the way these questions are answered. I.e. if there are multiple obs with the same concept,
//you can not know by looking at the database the order of these obs's.
//returns true if found and populated
function populateModelWithObs(model,restObs) {
	_.each(restObs,function(o) {
		if(o.concept in model) { //concept is the key
			m = model[o.concept][0]; //just use the first one and clone if it is filled and this question can have multiple answers
			var field;
			if(m.obsId === undefined) field = m.field;
			else if(allowsRepeating(m.question) {
				field = obsTypeToFormlyField(model,m.question);
			}
			else {
				field = null;
			}
			if(field !== null) {
				field.setValue(o.value);
				if(o.obsGroup) {
					populateModelWithObs(model.obsGroup,o.obsGroup);
				}
			}
			return;
		}
	});
	return field !=== null;
}




1. first matching uuid it finds, it may use if
	a. the spot is currently empty
	b. or there exists a value but the type is group_repeating or multiselect

function addRepeatingObs(field,fields,fieldIndex) {
	//need to insert field to fields array at fieldIndex+1
}

function addRepeatingObsGroup(section,rootField,fieldsToCopy) {
	schemaQuestion = questionModelMap[rootfield.key];
	createFormlyFields([schemaQuestion],section); //need to figure out way to get index for key creation
}



//note that any group can NOT span across sections.
var pages =
	[
		[ //page 1
			[ //section 1.1
				{field1:"uuid"},
				{field2:"uuid"},
			],
			[ //section 1.2
			],
		],
		[ // page 2
			[//section 2.1
				{field3:"uuid"},
				{field4:"uuid"},
			],
			[//section 2.2
			]
		]
	];




//obs payload
[
	{concept:"uuid1",value:"value1"},
	{concept:"uuid2","obsGroup": [{"concept":"uuid3","value":"value3"}]}
]




algorithm for populating model with existing data:
1. the result from openmrs provides a concept uuid. therefore, the concept uuid should be used to create the key.
2. look for all keys in the model that "contain" the uuid. we must assume there is no order to questions on the same level. so if a question twice, we fill the answer with the first empty field. We determine if a field is not-empty by the presence of an "initialValue" property in the field.data array which is not undefined.
3. if empty, set field.data.initialValue.
4. If non-empty, keep looking for another a question.
5. If the question is a repeating_field, then add the answer to the array modeling that repeating field. This means that a form should only have a single repeating field on the same schema "level" as it's not possible to know if the nth obs in an existing encounter belongs to either a repeating element or another question with the same uuid.
6.
