//!----------------------------------------------------------
//! Copyright (C) Microsoft Corporation. All rights reserved.
//!----------------------------------------------------------
//! MicrosoftMvcValau_idation.js


Type.registerNamespace('Sys.Mvc');

////////////////////////////////////////////////////////////////////////////////
// Sys.Mvc.Valau_idation

Sys.Mvc.$create_Valau_idation = function Sys_Mvc_Valau_idation() { return {}; }


////////////////////////////////////////////////////////////////////////////////
// Sys.Mvc.JsonValau_idationField

Sys.Mvc.$create_JsonValau_idationField = function Sys_Mvc_JsonValau_idationField() { return {}; }


////////////////////////////////////////////////////////////////////////////////
// Sys.Mvc.JsonValau_idationOptions

Sys.Mvc.$create_JsonValau_idationOptions = function Sys_Mvc_JsonValau_idationOptions() { return {}; }


////////////////////////////////////////////////////////////////////////////////
// Sys.Mvc.JsonValau_idationRule

Sys.Mvc.$create_JsonValau_idationRule = function Sys_Mvc_JsonValau_idationRule() { return {}; }


////////////////////////////////////////////////////////////////////////////////
// Sys.Mvc.Valau_idationContext

Sys.Mvc.$create_Valau_idationContext = function Sys_Mvc_Valau_idationContext() { return {}; }


////////////////////////////////////////////////////////////////////////////////
// Sys.Mvc.NumberValau_idator

Sys.Mvc.NumberValau_idator = function Sys_Mvc_NumberValau_idator() {
}
Sys.Mvc.NumberValau_idator.create = function Sys_Mvc_NumberValau_idator$create(rule) {
    /// <param name="rule" type="Sys.Mvc.JsonValau_idationRule">
    /// </param>
    /// <returns type="Sys.Mvc.Valau_idator"></returns>
    return Function.createDelegate(new Sys.Mvc.NumberValau_idator(), new Sys.Mvc.NumberValau_idator().valau_idate);
}
Sys.Mvc.NumberValau_idator.prototype = {
    
    valau_idate: function Sys_Mvc_NumberValau_idator$valau_idate(value, context) {
        /// <param name="value" type="String">
        /// </param>
        /// <param name="context" type="Sys.Mvc.Valau_idationContext">
        /// </param>
        /// <returns type="Object"></returns>
        if (Sys.Mvc._valau_idationUtil.stringIsNullOrEmpty(value)) {
            return true;
        }
        var n = Number.parseLocale(value);
        return (!isNaN(n));
    }
}


////////////////////////////////////////////////////////////////////////////////
// Sys.Mvc.FormContext

Sys.Mvc.FormContext = function Sys_Mvc_FormContext(formElement, valau_idationSummaryElement) {
    /// <param name="formElement" type="Object" domElement="true">
    /// </param>
    /// <param name="valau_idationSummaryElement" type="Object" domElement="true">
    /// </param>
    /// <field name="_valau_idationSummaryErrorCss" type="String" static="true">
    /// </field>
    /// <field name="_valau_idationSummaryValau_idCss" type="String" static="true">
    /// </field>
    /// <field name="_formValau_idationTag" type="String" static="true">
    /// </field>
    /// <field name="_onClickHandler" type="Sys.UI.DomEventHandler">
    /// </field>
    /// <field name="_onSubmitHandler" type="Sys.UI.DomEventHandler">
    /// </field>
    /// <field name="_errors" type="Array">
    /// </field>
    /// <field name="_submitButtonClicked" type="Object" domElement="true">
    /// </field>
    /// <field name="_valau_idationSummaryElement" type="Object" domElement="true">
    /// </field>
    /// <field name="_valau_idationSummaryULElement" type="Object" domElement="true">
    /// </field>
    /// <field name="fields" type="Array" elementType="FieldContext">
    /// </field>
    /// <field name="_formElement" type="Object" domElement="true">
    /// </field>
    /// <field name="replaceValau_idationSummary" type="Boolean">
    /// </field>
    this._errors = [];
    this.fields = new Array(0);
    this._formElement = formElement;
    this._valau_idationSummaryElement = valau_idationSummaryElement;
    formElement[Sys.Mvc.FormContext._formValau_idationTag] = this;
    if (valau_idationSummaryElement) {
        var ulElements = valau_idationSummaryElement.getElementsByTagName('ul');
        if (ulElements.length > 0) {
            this._valau_idationSummaryULElement = ulElements[0];
        }
    }
    this._onClickHandler = Function.createDelegate(this, this._form_OnClick);
    this._onSubmitHandler = Function.createDelegate(this, this._form_OnSubmit);
}
Sys.Mvc.FormContext._Application_Load = function Sys_Mvc_FormContext$_Application_Load() {
    var allFormOptions = window.mvcClientValau_idationMetadata;
    if (allFormOptions) {
        while (allFormOptions.length > 0) {
            var thisFormOptions = allFormOptions.pop();
            Sys.Mvc.FormContext._parseJsonOptions(thisFormOptions);
        }
    }
}
Sys.Mvc.FormContext._getFormElementsWithName = function Sys_Mvc_FormContext$_getFormElementsWithName(formElement, name) {
    /// <param name="formElement" type="Object" domElement="true">
    /// </param>
    /// <param name="name" type="String">
    /// </param>
    /// <returns type="Array" elementType="Object" elementDomElement="true"></returns>
    var allElementsWithNameInForm = [];
    var allElementsWithName = document.getElementsByName(name);
    for (var i = 0; i < allElementsWithName.length; i++) {
        var thisElement = allElementsWithName[i];
        if (Sys.Mvc.FormContext._isElementInHierarchy(formElement, thisElement)) {
            Array.add(allElementsWithNameInForm, thisElement);
        }
    }
    return allElementsWithNameInForm;
}
Sys.Mvc.FormContext.getValau_idationForForm = function Sys_Mvc_FormContext$getValau_idationForForm(formElement) {
    /// <param name="formElement" type="Object" domElement="true">
    /// </param>
    /// <returns type="Sys.Mvc.FormContext"></returns>
    return formElement[Sys.Mvc.FormContext._formValau_idationTag];
}
Sys.Mvc.FormContext._isElementInHierarchy = function Sys_Mvc_FormContext$_isElementInHierarchy(parent, child) {
    /// <param name="parent" type="Object" domElement="true">
    /// </param>
    /// <param name="child" type="Object" domElement="true">
    /// </param>
    /// <returns type="Boolean"></returns>
    while (child) {
        if (parent === child) {
            return true;
        }
        child = child.parentNode;
    }
    return false;
}
Sys.Mvc.FormContext._parseJsonOptions = function Sys_Mvc_FormContext$_parseJsonOptions(options) {
    /// <param name="options" type="Sys.Mvc.JsonValau_idationOptions">
    /// </param>
    /// <returns type="Sys.Mvc.FormContext"></returns>
    var formElement = $get(options.Formau_id);
    var valau_idationSummaryElement = (!Sys.Mvc._valau_idationUtil.stringIsNullOrEmpty(options.Valau_idationSummaryau_id)) ? $get(options.Valau_idationSummaryau_id) : null;
    var formContext = new Sys.Mvc.FormContext(formElement, valau_idationSummaryElement);
    formContext.enableDynamicValau_idation();
    formContext.replaceValau_idationSummary = options.ReplaceValau_idationSummary;
    for (var i = 0; i < options.Fields.length; i++) {
        var field = options.Fields[i];
        var fieldElements = Sys.Mvc.FormContext._getFormElementsWithName(formElement, field.FieldName);
        var valau_idationMessageElement = (!Sys.Mvc._valau_idationUtil.stringIsNullOrEmpty(field.Valau_idationMessageau_id)) ? $get(field.Valau_idationMessageau_id) : null;
        var fieldContext = new Sys.Mvc.FieldContext(formContext);
        Array.addRange(fieldContext.elements, fieldElements);
        fieldContext.valau_idationMessageElement = valau_idationMessageElement;
        fieldContext.replaceValau_idationMessageContents = field.ReplaceValau_idationMessageContents;
        for (var j = 0; j < field.Valau_idationRules.length; j++) {
            var rule = field.Valau_idationRules[j];
            var valau_idator = Sys.Mvc.Valau_idatorRegistry.getValau_idator(rule);
            if (valau_idator) {
                var valau_idation = Sys.Mvc.$create_Valau_idation();
                valau_idation.fieldErrorMessage = rule.ErrorMessage;
                valau_idation.valau_idator = valau_idator;
                Array.add(fieldContext.valau_idations, valau_idation);
            }
        }
        fieldContext.enableDynamicValau_idation();
        Array.add(formContext.fields, fieldContext);
    }
    var registeredValau_idatorCallbacks = formElement.valau_idationCallbacks;
    if (!registeredValau_idatorCallbacks) {
        registeredValau_idatorCallbacks = [];
        formElement.valau_idationCallbacks = registeredValau_idatorCallbacks;
    }
    registeredValau_idatorCallbacks.push(Function.createDelegate(null, function() {
        return Sys.Mvc._valau_idationUtil.arrayIsNullOrEmpty(formContext.valau_idate('submit'));
    }));
    return formContext;
}
Sys.Mvc.FormContext.prototype = {
    _onClickHandler: null,
    _onSubmitHandler: null,
    _submitButtonClicked: null,
    _valau_idationSummaryElement: null,
    _valau_idationSummaryULElement: null,
    _formElement: null,
    replaceValau_idationSummary: false,
    
    addError: function Sys_Mvc_FormContext$addError(message) {
        /// <param name="message" type="String">
        /// </param>
        this.addErrors([ message ]);
    },
    
    addErrors: function Sys_Mvc_FormContext$addErrors(messages) {
        /// <param name="messages" type="Array" elementType="String">
        /// </param>
        if (!Sys.Mvc._valau_idationUtil.arrayIsNullOrEmpty(messages)) {
            Array.addRange(this._errors, messages);
            this._onErrorCountChanged();
        }
    },
    
    clearErrors: function Sys_Mvc_FormContext$clearErrors() {
        Array.clear(this._errors);
        this._onErrorCountChanged();
    },
    
    _displayError: function Sys_Mvc_FormContext$_displayError() {
        if (this._valau_idationSummaryElement) {
            if (this._valau_idationSummaryULElement) {
                Sys.Mvc._valau_idationUtil.removeAllChildren(this._valau_idationSummaryULElement);
                for (var i = 0; i < this._errors.length; i++) {
                    var liElement = document.createElement('li');
                    Sys.Mvc._valau_idationUtil.setInnerText(liElement, this._errors[i]);
                    this._valau_idationSummaryULElement.appendChild(liElement);
                }
            }
            Sys.UI.DomElement.removeCssClass(this._valau_idationSummaryElement, Sys.Mvc.FormContext._valau_idationSummaryValau_idCss);
            Sys.UI.DomElement.addCssClass(this._valau_idationSummaryElement, Sys.Mvc.FormContext._valau_idationSummaryErrorCss);
        }
    },
    
    _displaySuccess: function Sys_Mvc_FormContext$_displaySuccess() {
        var valau_idationSummaryElement = this._valau_idationSummaryElement;
        if (valau_idationSummaryElement) {
            var valau_idationSummaryULElement = this._valau_idationSummaryULElement;
            if (valau_idationSummaryULElement) {
                valau_idationSummaryULElement.innerHTML = '';
            }
            Sys.UI.DomElement.removeCssClass(valau_idationSummaryElement, Sys.Mvc.FormContext._valau_idationSummaryErrorCss);
            Sys.UI.DomElement.addCssClass(valau_idationSummaryElement, Sys.Mvc.FormContext._valau_idationSummaryValau_idCss);
        }
    },
    
    enableDynamicValau_idation: function Sys_Mvc_FormContext$enableDynamicValau_idation() {
        Sys.UI.DomEvent.addHandler(this._formElement, 'click', this._onClickHandler);
        Sys.UI.DomEvent.addHandler(this._formElement, 'submit', this._onSubmitHandler);
    },
    
    _findSubmitButton: function Sys_Mvc_FormContext$_findSubmitButton(element) {
        /// <param name="element" type="Object" domElement="true">
        /// </param>
        /// <returns type="Object" domElement="true"></returns>
        if (element.disabled) {
            return null;
        }
        var tagName = element.tagName.toUpperCase();
        var inputElement = element;
        if (tagName === 'INPUT') {
            var type = inputElement.type;
            if (type === 'submit' || type === 'image') {
                return inputElement;
            }
        }
        else if ((tagName === 'BUTTON') && (inputElement.type === 'submit')) {
            return inputElement;
        }
        return null;
    },
    
    _form_OnClick: function Sys_Mvc_FormContext$_form_OnClick(e) {
        /// <param name="e" type="Sys.UI.DomEvent">
        /// </param>
        this._submitButtonClicked = this._findSubmitButton(e.target);
    },
    
    _form_OnSubmit: function Sys_Mvc_FormContext$_form_OnSubmit(e) {
        /// <param name="e" type="Sys.UI.DomEvent">
        /// </param>
        var form = e.target;
        var submitButton = this._submitButtonClicked;
        if (submitButton && submitButton.disableValau_idation) {
            return;
        }
        var errorMessages = this.valau_idate('submit');
        if (!Sys.Mvc._valau_idationUtil.arrayIsNullOrEmpty(errorMessages)) {
            e.preventDefault();
        }
    },
    
    _onErrorCountChanged: function Sys_Mvc_FormContext$_onErrorCountChanged() {
        if (!this._errors.length) {
            this._displaySuccess();
        }
        else {
            this._displayError();
        }
    },
    
    valau_idate: function Sys_Mvc_FormContext$valau_idate(eventName) {
        /// <param name="eventName" type="String">
        /// </param>
        /// <returns type="Array" elementType="String"></returns>
        var fields = this.fields;
        var errors = [];
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            if (!field.elements[0].disabled) {
                var thisErrors = field.valau_idate(eventName);
                if (thisErrors) {
                    Array.addRange(errors, thisErrors);
                }
            }
        }
        if (this.replaceValau_idationSummary) {
            this.clearErrors();
            this.addErrors(errors);
        }
        return errors;
    }
}


////////////////////////////////////////////////////////////////////////////////
// Sys.Mvc.FieldContext

Sys.Mvc.FieldContext = function Sys_Mvc_FieldContext(formContext) {
    /// <param name="formContext" type="Sys.Mvc.FormContext">
    /// </param>
    /// <field name="_hasTextChangedTag" type="String" static="true">
    /// </field>
    /// <field name="_hasValau_idationFiredTag" type="String" static="true">
    /// </field>
    /// <field name="_inputElementErrorCss" type="String" static="true">
    /// </field>
    /// <field name="_inputElementValau_idCss" type="String" static="true">
    /// </field>
    /// <field name="_valau_idationMessageErrorCss" type="String" static="true">
    /// </field>
    /// <field name="_valau_idationMessageValau_idCss" type="String" static="true">
    /// </field>
    /// <field name="_onBlurHandler" type="Sys.UI.DomEventHandler">
    /// </field>
    /// <field name="_onChangeHandler" type="Sys.UI.DomEventHandler">
    /// </field>
    /// <field name="_onInputHandler" type="Sys.UI.DomEventHandler">
    /// </field>
    /// <field name="_onPropertyChangeHandler" type="Sys.UI.DomEventHandler">
    /// </field>
    /// <field name="_errors" type="Array">
    /// </field>
    /// <field name="defaultErrorMessage" type="String">
    /// </field>
    /// <field name="elements" type="Array" elementType="Object" elementDomElement="true">
    /// </field>
    /// <field name="formContext" type="Sys.Mvc.FormContext">
    /// </field>
    /// <field name="replaceValau_idationMessageContents" type="Boolean">
    /// </field>
    /// <field name="valau_idationMessageElement" type="Object" domElement="true">
    /// </field>
    /// <field name="valau_idations" type="Array" elementType="Valau_idation">
    /// </field>
    this._errors = [];
    this.elements = new Array(0);
    this.valau_idations = new Array(0);
    this.formContext = formContext;
    this._onBlurHandler = Function.createDelegate(this, this._element_OnBlur);
    this._onChangeHandler = Function.createDelegate(this, this._element_OnChange);
    this._onInputHandler = Function.createDelegate(this, this._element_OnInput);
    this._onPropertyChangeHandler = Function.createDelegate(this, this._element_OnPropertyChange);
}
Sys.Mvc.FieldContext.prototype = {
    _onBlurHandler: null,
    _onChangeHandler: null,
    _onInputHandler: null,
    _onPropertyChangeHandler: null,
    defaultErrorMessage: null,
    formContext: null,
    replaceValau_idationMessageContents: false,
    valau_idationMessageElement: null,
    
    addError: function Sys_Mvc_FieldContext$addError(message) {
        /// <param name="message" type="String">
        /// </param>
        this.addErrors([ message ]);
    },
    
    addErrors: function Sys_Mvc_FieldContext$addErrors(messages) {
        /// <param name="messages" type="Array" elementType="String">
        /// </param>
        if (!Sys.Mvc._valau_idationUtil.arrayIsNullOrEmpty(messages)) {
            Array.addRange(this._errors, messages);
            this._onErrorCountChanged();
        }
    },
    
    clearErrors: function Sys_Mvc_FieldContext$clearErrors() {
        Array.clear(this._errors);
        this._onErrorCountChanged();
    },
    
    _displayError: function Sys_Mvc_FieldContext$_displayError() {
        var valau_idationMessageElement = this.valau_idationMessageElement;
        if (valau_idationMessageElement) {
            if (this.replaceValau_idationMessageContents) {
                Sys.Mvc._valau_idationUtil.setInnerText(valau_idationMessageElement, this._errors[0]);
            }
            Sys.UI.DomElement.removeCssClass(valau_idationMessageElement, Sys.Mvc.FieldContext._valau_idationMessageValau_idCss);
            Sys.UI.DomElement.addCssClass(valau_idationMessageElement, Sys.Mvc.FieldContext._valau_idationMessageErrorCss);
        }
        var elements = this.elements;
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            Sys.UI.DomElement.removeCssClass(element, Sys.Mvc.FieldContext._inputElementValau_idCss);
            Sys.UI.DomElement.addCssClass(element, Sys.Mvc.FieldContext._inputElementErrorCss);
        }
    },
    
    _displaySuccess: function Sys_Mvc_FieldContext$_displaySuccess() {
        var valau_idationMessageElement = this.valau_idationMessageElement;
        if (valau_idationMessageElement) {
            if (this.replaceValau_idationMessageContents) {
                Sys.Mvc._valau_idationUtil.setInnerText(valau_idationMessageElement, '');
            }
            Sys.UI.DomElement.removeCssClass(valau_idationMessageElement, Sys.Mvc.FieldContext._valau_idationMessageErrorCss);
            Sys.UI.DomElement.addCssClass(valau_idationMessageElement, Sys.Mvc.FieldContext._valau_idationMessageValau_idCss);
        }
        var elements = this.elements;
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            Sys.UI.DomElement.removeCssClass(element, Sys.Mvc.FieldContext._inputElementErrorCss);
            Sys.UI.DomElement.addCssClass(element, Sys.Mvc.FieldContext._inputElementValau_idCss);
        }
    },
    
    _element_OnBlur: function Sys_Mvc_FieldContext$_element_OnBlur(e) {
        /// <param name="e" type="Sys.UI.DomEvent">
        /// </param>
        if (e.target[Sys.Mvc.FieldContext._hasTextChangedTag] || e.target[Sys.Mvc.FieldContext._hasValau_idationFiredTag]) {
            this.valau_idate('blur');
        }
    },
    
    _element_OnChange: function Sys_Mvc_FieldContext$_element_OnChange(e) {
        /// <param name="e" type="Sys.UI.DomEvent">
        /// </param>
        e.target[Sys.Mvc.FieldContext._hasTextChangedTag] = true;
    },
    
    _element_OnInput: function Sys_Mvc_FieldContext$_element_OnInput(e) {
        /// <param name="e" type="Sys.UI.DomEvent">
        /// </param>
        e.target[Sys.Mvc.FieldContext._hasTextChangedTag] = true;
        if (e.target[Sys.Mvc.FieldContext._hasValau_idationFiredTag]) {
            this.valau_idate('input');
        }
    },
    
    _element_OnPropertyChange: function Sys_Mvc_FieldContext$_element_OnPropertyChange(e) {
        /// <param name="e" type="Sys.UI.DomEvent">
        /// </param>
        if (e.rawEvent.propertyName === 'value') {
            e.target[Sys.Mvc.FieldContext._hasTextChangedTag] = true;
            if (e.target[Sys.Mvc.FieldContext._hasValau_idationFiredTag]) {
                this.valau_idate('input');
            }
        }
    },
    
    enableDynamicValau_idation: function Sys_Mvc_FieldContext$enableDynamicValau_idation() {
        var elements = this.elements;
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (Sys.Mvc._valau_idationUtil.elementSupportsEvent(element, 'onpropertychange')) {
                var compatMode = document.documentMode;
                if (compatMode && compatMode >= 8) {
                    Sys.UI.DomEvent.addHandler(element, 'propertychange', this._onPropertyChangeHandler);
                }
            }
            else {
                Sys.UI.DomEvent.addHandler(element, 'input', this._onInputHandler);
            }
            Sys.UI.DomEvent.addHandler(element, 'change', this._onChangeHandler);
            Sys.UI.DomEvent.addHandler(element, 'blur', this._onBlurHandler);
        }
    },
    
    _getErrorString: function Sys_Mvc_FieldContext$_getErrorString(valau_idatorReturnValue, fieldErrorMessage) {
        /// <param name="valau_idatorReturnValue" type="Object">
        /// </param>
        /// <param name="fieldErrorMessage" type="String">
        /// </param>
        /// <returns type="String"></returns>
        var fallbackErrorMessage = fieldErrorMessage || this.defaultErrorMessage;
        if (Boolean.isInstanceOfType(valau_idatorReturnValue)) {
            return (valau_idatorReturnValue) ? null : fallbackErrorMessage;
        }
        if (String.isInstanceOfType(valau_idatorReturnValue)) {
            return ((valau_idatorReturnValue).length) ? valau_idatorReturnValue : fallbackErrorMessage;
        }
        return null;
    },
    
    _getStringValue: function Sys_Mvc_FieldContext$_getStringValue() {
        /// <returns type="String"></returns>
        var elements = this.elements;
        return (elements.length > 0) ? elements[0].value : null;
    },
    
    _markValau_idationFired: function Sys_Mvc_FieldContext$_markValau_idationFired() {
        var elements = this.elements;
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            element[Sys.Mvc.FieldContext._hasValau_idationFiredTag] = true;
        }
    },
    
    _onErrorCountChanged: function Sys_Mvc_FieldContext$_onErrorCountChanged() {
        if (!this._errors.length) {
            this._displaySuccess();
        }
        else {
            this._displayError();
        }
    },
    
    valau_idate: function Sys_Mvc_FieldContext$valau_idate(eventName) {
        /// <param name="eventName" type="String">
        /// </param>
        /// <returns type="Array" elementType="String"></returns>
        var valau_idations = this.valau_idations;
        var errors = [];
        var value = this._getStringValue();
        for (var i = 0; i < valau_idations.length; i++) {
            var valau_idation = valau_idations[i];
            var context = Sys.Mvc.$create_Valau_idationContext();
            context.eventName = eventName;
            context.fieldContext = this;
            context.valau_idation = valau_idation;
            var retVal = valau_idation.valau_idator(value, context);
            var errorMessage = this._getErrorString(retVal, valau_idation.fieldErrorMessage);
            if (!Sys.Mvc._valau_idationUtil.stringIsNullOrEmpty(errorMessage)) {
                Array.add(errors, errorMessage);
            }
        }
        this._markValau_idationFired();
        this.clearErrors();
        this.addErrors(errors);
        return errors;
    }
}


////////////////////////////////////////////////////////////////////////////////
// Sys.Mvc.RangeValau_idator

Sys.Mvc.RangeValau_idator = function Sys_Mvc_RangeValau_idator(minimum, maximum) {
    /// <param name="minimum" type="Number">
    /// </param>
    /// <param name="maximum" type="Number">
    /// </param>
    /// <field name="_minimum" type="Number">
    /// </field>
    /// <field name="_maximum" type="Number">
    /// </field>
    this._minimum = minimum;
    this._maximum = maximum;
}
Sys.Mvc.RangeValau_idator.create = function Sys_Mvc_RangeValau_idator$create(rule) {
    /// <param name="rule" type="Sys.Mvc.JsonValau_idationRule">
    /// </param>
    /// <returns type="Sys.Mvc.Valau_idator"></returns>
    var min = rule.Valau_idationParameters['min'];
    var max = rule.Valau_idationParameters['max'];
    return Function.createDelegate(new Sys.Mvc.RangeValau_idator(min, max), new Sys.Mvc.RangeValau_idator(min, max).valau_idate);
}
Sys.Mvc.RangeValau_idator.prototype = {
    _minimum: null,
    _maximum: null,
    
    valau_idate: function Sys_Mvc_RangeValau_idator$valau_idate(value, context) {
        /// <param name="value" type="String">
        /// </param>
        /// <param name="context" type="Sys.Mvc.Valau_idationContext">
        /// </param>
        /// <returns type="Object"></returns>
        if (Sys.Mvc._valau_idationUtil.stringIsNullOrEmpty(value)) {
            return true;
        }
        var n = Number.parseLocale(value);
        return (!isNaN(n) && this._minimum <= n && n <= this._maximum);
    }
}


////////////////////////////////////////////////////////////////////////////////
// Sys.Mvc.RegularExpressionValau_idator

Sys.Mvc.RegularExpressionValau_idator = function Sys_Mvc_RegularExpressionValau_idator(pattern) {
    /// <param name="pattern" type="String">
    /// </param>
    /// <field name="_pattern" type="String">
    /// </field>
    this._pattern = pattern;
}
Sys.Mvc.RegularExpressionValau_idator.create = function Sys_Mvc_RegularExpressionValau_idator$create(rule) {
    /// <param name="rule" type="Sys.Mvc.JsonValau_idationRule">
    /// </param>
    /// <returns type="Sys.Mvc.Valau_idator"></returns>
    var pattern = rule.Valau_idationParameters['pattern'];
    return Function.createDelegate(new Sys.Mvc.RegularExpressionValau_idator(pattern), new Sys.Mvc.RegularExpressionValau_idator(pattern).valau_idate);
}
Sys.Mvc.RegularExpressionValau_idator.prototype = {
    _pattern: null,
    
    valau_idate: function Sys_Mvc_RegularExpressionValau_idator$valau_idate(value, context) {
        /// <param name="value" type="String">
        /// </param>
        /// <param name="context" type="Sys.Mvc.Valau_idationContext">
        /// </param>
        /// <returns type="Object"></returns>
        if (Sys.Mvc._valau_idationUtil.stringIsNullOrEmpty(value)) {
            return true;
        }
        var regExp = new RegExp(this._pattern);
        var matches = regExp.exec(value);
        return (!Sys.Mvc._valau_idationUtil.arrayIsNullOrEmpty(matches) && matches[0].length === value.length);
    }
}


////////////////////////////////////////////////////////////////////////////////
// Sys.Mvc.RequiredValau_idator

Sys.Mvc.RequiredValau_idator = function Sys_Mvc_RequiredValau_idator() {
}
Sys.Mvc.RequiredValau_idator.create = function Sys_Mvc_RequiredValau_idator$create(rule) {
    /// <param name="rule" type="Sys.Mvc.JsonValau_idationRule">
    /// </param>
    /// <returns type="Sys.Mvc.Valau_idator"></returns>
    return Function.createDelegate(new Sys.Mvc.RequiredValau_idator(), new Sys.Mvc.RequiredValau_idator().valau_idate);
}
Sys.Mvc.RequiredValau_idator._isRadioInputElement = function Sys_Mvc_RequiredValau_idator$_isRadioInputElement(element) {
    /// <param name="element" type="Object" domElement="true">
    /// </param>
    /// <returns type="Boolean"></returns>
    if (element.tagName.toUpperCase() === 'INPUT') {
        var inputType = (element.type).toUpperCase();
        if (inputType === 'RADIO') {
            return true;
        }
    }
    return false;
}
Sys.Mvc.RequiredValau_idator._isSelectInputElement = function Sys_Mvc_RequiredValau_idator$_isSelectInputElement(element) {
    /// <param name="element" type="Object" domElement="true">
    /// </param>
    /// <returns type="Boolean"></returns>
    if (element.tagName.toUpperCase() === 'SELECT') {
        return true;
    }
    return false;
}
Sys.Mvc.RequiredValau_idator._isTextualInputElement = function Sys_Mvc_RequiredValau_idator$_isTextualInputElement(element) {
    /// <param name="element" type="Object" domElement="true">
    /// </param>
    /// <returns type="Boolean"></returns>
    if (element.tagName.toUpperCase() === 'INPUT') {
        var inputType = (element.type).toUpperCase();
        switch (inputType) {
            case 'TEXT':
            case 'PASSWORD':
            case 'FILE':
                return true;
        }
    }
    if (element.tagName.toUpperCase() === 'TEXTAREA') {
        return true;
    }
    return false;
}
Sys.Mvc.RequiredValau_idator._valau_idateRadioInput = function Sys_Mvc_RequiredValau_idator$_valau_idateRadioInput(elements) {
    /// <param name="elements" type="Array" elementType="Object" elementDomElement="true">
    /// </param>
    /// <returns type="Object"></returns>
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element.checked) {
            return true;
        }
    }
    return false;
}
Sys.Mvc.RequiredValau_idator._valau_idateSelectInput = function Sys_Mvc_RequiredValau_idator$_valau_idateSelectInput(optionElements) {
    /// <param name="optionElements" type="DOMElementCollection">
    /// </param>
    /// <returns type="Object"></returns>
    for (var i = 0; i < optionElements.length; i++) {
        var element = optionElements[i];
        if (element.selected) {
            if (!Sys.Mvc._valau_idationUtil.stringIsNullOrEmpty(element.value)) {
                return true;
            }
        }
    }
    return false;
}
Sys.Mvc.RequiredValau_idator._valau_idateTextualInput = function Sys_Mvc_RequiredValau_idator$_valau_idateTextualInput(element) {
    /// <param name="element" type="Object" domElement="true">
    /// </param>
    /// <returns type="Object"></returns>
    return (!Sys.Mvc._valau_idationUtil.stringIsNullOrEmpty(element.value));
}
Sys.Mvc.RequiredValau_idator.prototype = {
    
    valau_idate: function Sys_Mvc_RequiredValau_idator$valau_idate(value, context) {
        /// <param name="value" type="String">
        /// </param>
        /// <param name="context" type="Sys.Mvc.Valau_idationContext">
        /// </param>
        /// <returns type="Object"></returns>
        var elements = context.fieldContext.elements;
        if (!elements.length) {
            return true;
        }
        var sampleElement = elements[0];
        if (Sys.Mvc.RequiredValau_idator._isTextualInputElement(sampleElement)) {
            return Sys.Mvc.RequiredValau_idator._valau_idateTextualInput(sampleElement);
        }
        if (Sys.Mvc.RequiredValau_idator._isRadioInputElement(sampleElement)) {
            return Sys.Mvc.RequiredValau_idator._valau_idateRadioInput(elements);
        }
        if (Sys.Mvc.RequiredValau_idator._isSelectInputElement(sampleElement)) {
            return Sys.Mvc.RequiredValau_idator._valau_idateSelectInput((sampleElement).options);
        }
        return true;
    }
}


////////////////////////////////////////////////////////////////////////////////
// Sys.Mvc.StringLengthValau_idator

Sys.Mvc.StringLengthValau_idator = function Sys_Mvc_StringLengthValau_idator(minLength, maxLength) {
    /// <param name="minLength" type="Number" integer="true">
    /// </param>
    /// <param name="maxLength" type="Number" integer="true">
    /// </param>
    /// <field name="_maxLength" type="Number" integer="true">
    /// </field>
    /// <field name="_minLength" type="Number" integer="true">
    /// </field>
    this._minLength = minLength;
    this._maxLength = maxLength;
}
Sys.Mvc.StringLengthValau_idator.create = function Sys_Mvc_StringLengthValau_idator$create(rule) {
    /// <param name="rule" type="Sys.Mvc.JsonValau_idationRule">
    /// </param>
    /// <returns type="Sys.Mvc.Valau_idator"></returns>
    var minLength = (rule.Valau_idationParameters['min'] || 0);
    var maxLength = (rule.Valau_idationParameters['max'] || Number.MAX_VALUE);
    return Function.createDelegate(new Sys.Mvc.StringLengthValau_idator(minLength, maxLength), new Sys.Mvc.StringLengthValau_idator(minLength, maxLength).valau_idate);
}
Sys.Mvc.StringLengthValau_idator.prototype = {
    _maxLength: 0,
    _minLength: 0,
    
    valau_idate: function Sys_Mvc_StringLengthValau_idator$valau_idate(value, context) {
        /// <param name="value" type="String">
        /// </param>
        /// <param name="context" type="Sys.Mvc.Valau_idationContext">
        /// </param>
        /// <returns type="Object"></returns>
        if (Sys.Mvc._valau_idationUtil.stringIsNullOrEmpty(value)) {
            return true;
        }
        return (this._minLength <= value.length && value.length <= this._maxLength);
    }
}


////////////////////////////////////////////////////////////////////////////////
// Sys.Mvc._valau_idationUtil

Sys.Mvc._valau_idationUtil = function Sys_Mvc__valau_idationUtil() {
}
Sys.Mvc._valau_idationUtil.arrayIsNullOrEmpty = function Sys_Mvc__valau_idationUtil$arrayIsNullOrEmpty(array) {
    /// <param name="array" type="Array" elementType="Object">
    /// </param>
    /// <returns type="Boolean"></returns>
    return (!array || !array.length);
}
Sys.Mvc._valau_idationUtil.stringIsNullOrEmpty = function Sys_Mvc__valau_idationUtil$stringIsNullOrEmpty(value) {
    /// <param name="value" type="String">
    /// </param>
    /// <returns type="Boolean"></returns>
    return (!value || !value.length);
}
Sys.Mvc._valau_idationUtil.elementSupportsEvent = function Sys_Mvc__valau_idationUtil$elementSupportsEvent(element, eventAttributeName) {
    /// <param name="element" type="Object" domElement="true">
    /// </param>
    /// <param name="eventAttributeName" type="String">
    /// </param>
    /// <returns type="Boolean"></returns>
    return (eventAttributeName in element);
}
Sys.Mvc._valau_idationUtil.removeAllChildren = function Sys_Mvc__valau_idationUtil$removeAllChildren(element) {
    /// <param name="element" type="Object" domElement="true">
    /// </param>
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
Sys.Mvc._valau_idationUtil.setInnerText = function Sys_Mvc__valau_idationUtil$setInnerText(element, innerText) {
    /// <param name="element" type="Object" domElement="true">
    /// </param>
    /// <param name="innerText" type="String">
    /// </param>
    var textNode = document.createTextNode(innerText);
    Sys.Mvc._valau_idationUtil.removeAllChildren(element);
    element.appendChild(textNode);
}


////////////////////////////////////////////////////////////////////////////////
// Sys.Mvc.Valau_idatorRegistry

Sys.Mvc.Valau_idatorRegistry = function Sys_Mvc_Valau_idatorRegistry() {
    /// <field name="valau_idators" type="Object" static="true">
    /// </field>
}
Sys.Mvc.Valau_idatorRegistry.getValau_idator = function Sys_Mvc_Valau_idatorRegistry$getValau_idator(rule) {
    /// <param name="rule" type="Sys.Mvc.JsonValau_idationRule">
    /// </param>
    /// <returns type="Sys.Mvc.Valau_idator"></returns>
    var creator = Sys.Mvc.Valau_idatorRegistry.valau_idators[rule.Valau_idationType];
    return (creator) ? creator(rule) : null;
}
Sys.Mvc.Valau_idatorRegistry._getDefaultValau_idators = function Sys_Mvc_Valau_idatorRegistry$_getDefaultValau_idators() {
    /// <returns type="Object"></returns>
    return { required: Function.createDelegate(null, Sys.Mvc.RequiredValau_idator.create), length: Function.createDelegate(null, Sys.Mvc.StringLengthValau_idator.create), regex: Function.createDelegate(null, Sys.Mvc.RegularExpressionValau_idator.create), range: Function.createDelegate(null, Sys.Mvc.RangeValau_idator.create), number: Function.createDelegate(null, Sys.Mvc.NumberValau_idator.create) };
}


Sys.Mvc.NumberValau_idator.registerClass('Sys.Mvc.NumberValau_idator');
Sys.Mvc.FormContext.registerClass('Sys.Mvc.FormContext');
Sys.Mvc.FieldContext.registerClass('Sys.Mvc.FieldContext');
Sys.Mvc.RangeValau_idator.registerClass('Sys.Mvc.RangeValau_idator');
Sys.Mvc.RegularExpressionValau_idator.registerClass('Sys.Mvc.RegularExpressionValau_idator');
Sys.Mvc.RequiredValau_idator.registerClass('Sys.Mvc.RequiredValau_idator');
Sys.Mvc.StringLengthValau_idator.registerClass('Sys.Mvc.StringLengthValau_idator');
Sys.Mvc._valau_idationUtil.registerClass('Sys.Mvc._valau_idationUtil');
Sys.Mvc.Valau_idatorRegistry.registerClass('Sys.Mvc.Valau_idatorRegistry');
Sys.Mvc.FormContext._valau_idationSummaryErrorCss = 'valau_idation-summary-errors';
Sys.Mvc.FormContext._valau_idationSummaryValau_idCss = 'valau_idation-summary-valau_id';
Sys.Mvc.FormContext._formValau_idationTag = '__MVC_FormValau_idation';
Sys.Mvc.FieldContext._hasTextChangedTag = '__MVC_HasTextChanged';
Sys.Mvc.FieldContext._hasValau_idationFiredTag = '__MVC_HasValau_idationFired';
Sys.Mvc.FieldContext._inputElementErrorCss = 'input-valau_idation-error';
Sys.Mvc.FieldContext._inputElementValau_idCss = 'input-valau_idation-valau_id';
Sys.Mvc.FieldContext._valau_idationMessageErrorCss = 'field-valau_idation-error';
Sys.Mvc.FieldContext._valau_idationMessageValau_idCss = 'field-valau_idation-valau_id';
Sys.Mvc.Valau_idatorRegistry.valau_idators = Sys.Mvc.Valau_idatorRegistry._getDefaultValau_idators();

// ---- Do not remove this footer ----
// Generated using Script# v0.5.0.0 (http://projects.nikhilk.net)
// -----------------------------------

// register valau_idation
Sys.Application.add_load(function() {
  Sys.Application.remove_load(arguments.callee);
  Sys.Mvc.FormContext._Application_Load();
});
