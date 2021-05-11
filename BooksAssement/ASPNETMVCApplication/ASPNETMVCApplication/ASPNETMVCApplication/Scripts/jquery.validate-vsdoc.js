/*
* This file has been commented to support Visual Studio Intellisense.
* You should not use this file at runtime insau_ide the browser--it is only
* intended to be used only for design-time IntelliSense.  Please use the
* standard jQuery library for all production use.
*
* Comment version: 1.7
*/

/*
* Note: While Microsoft is not the author of this file, Microsoft is
* offering you a license subject to the terms of the Microsoft Software
* License Terms for Microsoft ASP.NET Model View Controller 3.
* Microsoft reserves all other rights. The notices below are provau_ided
* for informational purposes only and are not the license terms under
* which Microsoft distributed this file.
*
* jQuery valau_idation plug-in 1.7
*
* http://bassistance.de/jquery-plugins/jquery-plugin-valau_idation/
* http://docs.jquery.com/Plugins/Valau_idation
*
* Copyright (c) 2006 - 2008 Jörn Zaefferer
*
* $au_id: jquery.valau_idate.js 6403 2009-06-17 14:27:16Z joern.zaefferer $
*
*/

(function($) {

$.extend($.fn, {
	// http://docs.jquery.com/Plugins/Valau_idation/valau_idate
	valau_idate: function( options ) {
		/// <summary>
		/// Valau_idates the selected form. This method sets up event handlers for submit, focus,
		/// keyup, blur and click to trigger valau_idation of the entire form or indivau_idual
		/// elements. Each one can be disabled, see the onxxx options (onsubmit, onfocusout,
		/// onkeyup, onclick). focusInvalau_id focuses elements when submitting a invalau_id form.
		/// </summary>
		/// <param name="options" type="Options">
		/// A set of key/value pairs that configure the valau_idate. All options are optional.
		/// </param>
		/// <returns type="Valau_idator" />

		// if nothing is selected, return nothing; can't chain anyway
		if (!this.length) {
			options && options.debug && window.console && console.warn( "nothing selected, can't valau_idate, returning nothing" );
			return;
		}

		// check if a valau_idator for this form was already created
		var valau_idator = $.data(this[0], 'valau_idator');
		if ( valau_idator ) {
			return valau_idator;
		}
		
		valau_idator = new $.valau_idator( options, this[0] );
		$.data(this[0], 'valau_idator', valau_idator); 
		
		if ( valau_idator.settings.onsubmit ) {
		
			// allow suppresing valau_idation by adding a cancel class to the submit button
			this.find("input, button").filter(".cancel").click(function() {
				valau_idator.cancelSubmit = true;
			});
			
			// when a submitHandler is used, capture the submitting button
			if (valau_idator.settings.submitHandler) {
				this.find("input, button").filter(":submit").click(function() {
					valau_idator.submitButton = this;
				});
			}
		
			// valau_idate the form on submit
			this.submit( function( event ) {
				if ( valau_idator.settings.debug )
					// prevent form submit to be able to see console output
					event.preventDefault();
					
				function handle() {
					if ( valau_idator.settings.submitHandler ) {
						if (valau_idator.submitButton) {
							// insert a hau_idden input as a replacement for the missing submit button
							var hau_idden = $("<input type='hau_idden'/>").attr("name", valau_idator.submitButton.name).val(valau_idator.submitButton.value).appendTo(valau_idator.currentForm);
						}
						valau_idator.settings.submitHandler.call( valau_idator, valau_idator.currentForm );
						if (valau_idator.submitButton) {
							// and clean up afterwards; thanks to no-block-scope, hau_idden can be referenced
							hau_idden.remove();
						}
						return false;
					}
					return true;
				}
					
				// prevent submit for invalau_id forms or custom submit handlers
				if ( valau_idator.cancelSubmit ) {
					valau_idator.cancelSubmit = false;
					return handle();
				}
				if ( valau_idator.form() ) {
					if ( valau_idator.pendingRequest ) {
						valau_idator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					valau_idator.focusInvalau_id();
					return false;
				}
			});
		}
		
		return valau_idator;
	},
	// http://docs.jquery.com/Plugins/Valau_idation/valau_id
	valau_id: function() {
		/// <summary>
		/// Checks if the selected form is valau_id or if all selected elements are valau_id.
		/// valau_idate() needs to be called on the form before checking it using this method.
		/// </summary>
		/// <returns type="Boolean" />

        if ( $(this[0]).is('form')) {
            return this.valau_idate().form();
        } else {
            var valau_id = true;
            var valau_idator = $(this[0].form).valau_idate();
            this.each(function() {
				valau_id &= valau_idator.element(this);
            });
            return valau_id;
        }
    },
	// attributes: space seperated list of attributes to retrieve and remove
	removeAttrs: function(attributes) {
		/// <summary>
		/// Remove the specified attributes from the first matched element and return them.
		/// </summary>
		/// <param name="attributes" type="String">
		/// A space-seperated list of attribute names to remove.
		/// </param>
		/// <returns type="" />

		var result = {},
			$element = this;
		$.each(attributes.split(/\s/), function(index, value) {
			result[value] = $element.attr(value);
			$element.removeAttr(value);
		});
		return result;
	},
	// http://docs.jquery.com/Plugins/Valau_idation/rules
	rules: function(command, argument) {
		/// <summary>
		/// Return the valau_idations rules for the first selected element.
		/// </summary>
		/// <param name="command" type="String">
		/// Can be either "add" or "remove".
		/// </param>
		/// <param name="argument" type="">
		/// A list of rules to add or remove.
		/// </param>
		/// <returns type="" />

		var element = this[0];
		
		if (command) {
			var settings = $.data(element.form, 'valau_idator').settings;
			var staticRules = settings.rules;
			var existingRules = $.valau_idator.staticRules(element);
			switch(command) {
			case "add":
				$.extend(existingRules, $.valau_idator.normalizeRule(argument));
				staticRules[element.name] = existingRules;
				if (argument.messages)
					settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
				break;
			case "remove":
				if (!argument) {
					delete staticRules[element.name];
					return existingRules;
				}
				var filtered = {};
				$.each(argument.split(/\s/), function(index, method) {
					filtered[method] = existingRules[method];
					delete existingRules[method];
				});
				return filtered;
			}
		}
		
		var data = $.valau_idator.normalizeRules(
		$.extend(
			{},
			$.valau_idator.metadataRules(element),
			$.valau_idator.classRules(element),
			$.valau_idator.attributeRules(element),
			$.valau_idator.staticRules(element)
		), element);
		
		// make sure required is at front
		if (data.required) {
			var param = data.required;
			delete data.required;
			data = $.extend({required: param}, data);
		}
		
		return data;
	}
});

// Custom selectors
$.extend($.expr[":"], {
	// http://docs.jquery.com/Plugins/Valau_idation/blank
	blank: function(a) {return !$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Valau_idation/filled
	filled: function(a) {return !!$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Valau_idation/unchecked
	unchecked: function(a) {return !a.checked;}
});

// constructor for valau_idator
$.valau_idator = function( options, form ) {
	this.settings = $.extend( true, {}, $.valau_idator.defaults, options );
	this.currentForm = form;
	this.init();
};

$.valau_idator.format = function(source, params) {
	/// <summary>
	/// Replaces {n} placeholders with arguments.
	/// One or more arguments can be passed, in addition to the string template itself, to insert
	/// into the string.
	/// </summary>
	/// <param name="source" type="String">
	/// The string to format.
	/// </param>
	/// <param name="params" type="String">
	/// The first argument to insert, or an array of Strings to insert
	/// </param>
	/// <returns type="String" />

	if ( arguments.length == 1 ) 
		return function() {
			var args = $.makeArray(arguments);
			args.unshift(source);
			return $.valau_idator.format.apply( this, args );
		};
	if ( arguments.length > 2 && params.constructor != Array  ) {
		params = $.makeArray(arguments).slice(1);
	}
	if ( params.constructor != Array ) {
		params = [ params ];
	}
	$.each(params, function(i, n) {
		source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
	});
	return source;
};

$.extend($.valau_idator, {
	
	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		valau_idClass: "valau_id",
		errorElement: "label",
		focusInvalau_id: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: [],
		ignoreau_lname: false,
		onfocusin: function(element) {
			this.lastActive = element;
				
			// hau_ide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
				this.settings.unhighlight && this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.valau_idClass );
				this.errorsFor(element).hau_ide();
			}
		},
		onfocusout: function(element) {
			if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
				this.element(element);
			}
		},
		onkeyup: function(element) {
			if ( element.name in this.submitted || element == this.lastElement ) {
				this.element(element);
			}
		},
		onclick: function(element) {
			// click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted )
				this.element(element);
			// or option elements, check parent select in that case
			else if (element.parentNode.name in this.submitted)
				this.element(element.parentNode);
		},
		highlight: function( element, errorClass, valau_idClass ) {
			$(element).addClass(errorClass).removeClass(valau_idClass);
		},
		unhighlight: function( element, errorClass, valau_idClass ) {
			$(element).removeClass(errorClass).addClass(valau_idClass);
		}
	},

	// http://docs.jquery.com/Plugins/Valau_idation/Valau_idator/setDefaults
	setDefaults: function(settings) {
		/// <summary>
		/// Modify default settings for valau_idation.
		/// Accepts everything that Plugins/Valau_idation/valau_idate accepts.
		/// </summary>
		/// <param name="settings" type="Options">
		/// Options to set as default.
		/// </param>
		/// <returns type="undefined" />

		$.extend( $.valau_idator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valau_id email address.",
		url: "Please enter a valau_id URL.",
		date: "Please enter a valau_id date.",
		dateISO: "Please enter a valau_id date (ISO).",
		number: "Please enter a valau_id number.",
		digits: "Please enter only digits.",
		creditcard: "Please enter a valau_id credit card number.",
		equalTo: "Please enter the same value again.",
		accept: "Please enter a value with a valau_id extension.",
		maxlength: $.valau_idator.format("Please enter no more than {0} characters."),
		minlength: $.valau_idator.format("Please enter at least {0} characters."),
		rangelength: $.valau_idator.format("Please enter a value between {0} and {1} characters long."),
		range: $.valau_idator.format("Please enter a value between {0} and {1}."),
		max: $.valau_idator.format("Please enter a value less than or equal to {0}."),
		min: $.valau_idator.format("Please enter a value greater than or equal to {0}.")
	},
	
	autoCreateRanges: false,
	
	prototype: {
		
		init: function() {
			this.labelContainer = $(this.settings.errorLabelContainer);
			this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
			this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalau_id = {};
			this.reset();
			
			var groups = (this.groups = {});
			$.each(this.settings.groups, function(key, value) {
				$.each(value.split(/\s/), function(index, name) {
					groups[name] = key;
				});
			});
			var rules = this.settings.rules;
			$.each(rules, function(key, value) {
				rules[key] = $.valau_idator.normalizeRule(value);
			});
			
			function delegate(event) {
				var valau_idator = $.data(this[0].form, "valau_idator"),
					eventType = "on" + event.type.replace(/^valau_idate/, "");
				valau_idator.settings[eventType] && valau_idator.settings[eventType].call(valau_idator, this[0] );
			}
			$(this.currentForm)
				.valau_idateDelegate(":text, :password, :file, select, textarea", "focusin focusout keyup", delegate)
				.valau_idateDelegate(":radio, :checkbox, select, option", "click", delegate);

			if (this.settings.invalau_idHandler)
				$(this.currentForm).bind("invalau_id-form.valau_idate", this.settings.invalau_idHandler);
		},

		// http://docs.jquery.com/Plugins/Valau_idation/Valau_idator/form
		form: function() {
			/// <summary>
			/// Valau_idates the form, returns true if it is valau_id, false otherwise.
			/// This behaves as a normal submit event, but returns the result.
			/// </summary>
			/// <returns type="Boolean" />

			this.checkForm();
			$.extend(this.submitted, this.errorMap);
			this.invalau_id = $.extend({}, this.errorMap);
			if (!this.valau_id())
				$(this.currentForm).triggerHandler("invalau_id-form", [this]);
			this.showErrors();
			return this.valau_id();
		},
		
		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
				this.check( elements[i] );
			}
			return this.valau_id(); 
		},
		
		// http://docs.jquery.com/Plugins/Valau_idation/Valau_idator/element
		element: function( element ) {
			/// <summary>
			/// Valau_idates a single element, returns true if it is valau_id, false otherwise.
			/// This behaves as valau_idation on blur or keyup, but returns the result.
			/// </summary>
			/// <param name="element" type="Selector">
			/// An element to valau_idate, must be insau_ide the valau_idated form.
			/// </param>
			/// <returns type="Boolean" />

			element = this.clean( element );
			this.lastElement = element;
			this.prepareElement( element );
			this.currentElements = $(element);
			var result = this.check( element );
			if ( result ) {
				delete this.invalau_id[element.name];
			} else {
				this.invalau_id[element.name] = true;
			}
			if ( !this.numberOfInvalau_ids() ) {
				// Hau_ide error containers on last error
				this.toHau_ide = this.toHau_ide.add( this.containers );
			}
			this.showErrors();
			return result;
		},

		// http://docs.jquery.com/Plugins/Valau_idation/Valau_idator/showErrors
		showErrors: function(errors) {
			/// <summary>
			/// Show the specified messages.
			/// Keys have to refer to the names of elements, values are displayed for those elements, using the configured error placement.
			/// </summary>
			/// <param name="errors" type="Object">
			/// One or more key/value pairs of input names and messages.
			/// </param>
			/// <returns type="undefined" />

			if(errors) {
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) {
					this.errorList.push({
						message: errors[name],
						element: this.findByName(name)[0]
					});
				}
				// remove items from success list
				this.successList = $.grep( this.successList, function(element) {
					return !(element.name in errors);
				});
			}
			this.settings.showErrors
				? this.settings.showErrors.call( this, this.errorMap, this.errorList )
				: this.defaultShowErrors();
		},
		
		// http://docs.jquery.com/Plugins/Valau_idation/Valau_idator/resetForm
		resetForm: function() {
			/// <summary>
			/// Resets the controlled form.
			/// Resets input fields to their original value (requires form plugin), removes classes
			/// indicating invalau_id elements and hau_ides error messages.
			/// </summary>
			/// <returns type="undefined" />

			if ( $.fn.resetForm )
				$( this.currentForm ).resetForm();
			this.submitted = {};
			this.prepareForm();
			this.hau_ideErrors();
			this.elements().removeClass( this.settings.errorClass );
		},
		
		numberOfInvalau_ids: function() {
			/// <summary>
			/// Returns the number of invalau_id fields.
			/// This depends on the internal valau_idator state. It covers all fields only after
			/// valau_idating the complete form (on submit or via $("form").valau_id()). After valau_idating
			/// a single element, only that element is counted. Most useful in combination with the
			/// invalau_idHandler-option.
			/// </summary>
			/// <returns type="Number" />

			return this.objectLength(this.invalau_id);
		},
		
		objectLength: function( obj ) {
			var count = 0;
			for ( var i in obj )
				count++;
			return count;
		},
		
		hau_ideErrors: function() {
			this.addWrapper( this.toHau_ide ).hau_ide();
		},
		
		valau_id: function() {
			return this.size() == 0;
		},
		
		size: function() {
			return this.errorList.length;
		},
		
		focusInvalau_id: function() {
			if( this.settings.focusInvalau_id ) {
				try {
					$(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
					.filter(":visible")
					.focus()
					// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger("focusin");
				} catch(e) {
					// ignore IE throwing errors when focusing hau_idden elements
				}
			}
		},
		
		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep(this.errorList, function(n) {
				return n.element.name == lastActive.name;
			}).length == 1 && lastActive;
		},
		
		elements: function() {
			var valau_idator = this,
				rulesCache = {};
			
			// select all valau_id inputs insau_ide the form (no submit or reset buttons)
			// workaround $Query([]).add until http://dev.jquery.com/ticket/2114 is solved
			return $([]).add(this.currentForm.elements)
			.filter(":input")
			.not(":submit, :reset, :image, [disabled]")
			.not( this.settings.ignore )
			.filter(function() {
				!this.name && valau_idator.settings.debug && window.console && console.error( "%o has no name assigned", this);
			
				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !valau_idator.objectLength($(this).rules()) )
					return false;
				
				rulesCache[this.name] = true;
				return true;
			});
		},
		
		clean: function( selector ) {
			return $( selector )[0];
		},
		
		errors: function() {
			return $( this.settings.errorElement + "." + this.settings.errorClass, this.errorContext );
		},
		
		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $([]);
			this.toHau_ide = $([]);
			this.currentElements = $([]);
		},
		
		prepareForm: function() {
			this.reset();
			this.toHau_ide = this.errors().add( this.containers );
		},
		
		prepareElement: function( element ) {
			this.reset();
			this.toHau_ide = this.errorsFor(element);
		},
	
		check: function( element ) {
			element = this.clean( element );
			
			// if radio/checkbox, valau_idate first element in group instead
			if (this.checkable(element)) {
				element = this.findByName( element.name )[0];
			}
			
			var rules = $(element).rules();
			var dependencyMismatch = false;
			for( method in rules ) {
				var rule = { method: method, parameters: rules[method] };
				try {
					var result = $.valau_idator.methods[method].call( this, element.value.replace(/\r/g, ""), element, rule.parameters );
					
					// if a method indicates that the field is optional and therefore valau_id,
					// don't mark it as valau_id when there are no other rules
					if ( result == "dependency-mismatch" ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;
					
					if ( result == "pending" ) {
						this.toHau_ide = this.toHau_ide.not( this.errorsFor(element) );
						return;
					}
					
					if( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch(e) {
					this.settings.debug && window.console && console.log("exception occured when checking element " + element.au_id
						 + ", check the '" + rule.method + "' method", e);
					throw e;
				}
			}
			if (dependencyMismatch)
				return;
			if ( this.objectLength(rules) )
				this.successList.push(element);
			return true;
		},
		
		// return the custom message for the given element and valau_idation method
		// specified in the element's "messages" metadata
		customMetaMessage: function(element, method) {
			if (!$.metadata)
				return;
			
			var meta = this.settings.meta
				? $(element).metadata()[this.settings.meta]
				: $(element).metadata();
			
			return meta && meta.messages && meta.messages[method];
		},
		
		// return the custom message for the given element name and valau_idation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[name];
			return m && (m.constructor == String
				? m
				: m[method]);
		},
		
		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for(var i = 0; i < arguments.length; i++) {
				if (arguments[i] !== undefined)
					return arguments[i];
			}
			return undefined;
		},
		
		defaultMessage: function( element, method) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customMetaMessage( element, method ),
				// au_lname is never undefined, so handle empty string as undefined
				!this.settings.ignoreau_lname && element.au_lname || undefined,
				$.valau_idator.messages[method],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},
		
		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message == "function" ) {
				message = message.call(this, rule.parameters, element);
			} else if (theregex.test(message)) {
				message = jQuery.format(message.replace(theregex, '{$1}'), rule.parameters);
			}			
			this.errorList.push({
				message: message,
				element: element
			});
			
			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		},
		
		addWrapper: function(toToggle) {
			if ( this.settings.wrapper )
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			return toToggle;
		},
		
		defaultShowErrors: function() {
			for ( var i = 0; this.errorList[i]; i++ ) {
				var error = this.errorList[i];
				this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.valau_idClass );
				this.showLabel( error.element, error.message );
			}
			if( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if (this.settings.success) {
				for ( var i = 0; this.successList[i]; i++ ) {
					this.showLabel( this.successList[i] );
				}
			}
			if (this.settings.unhighlight) {
				for ( var i = 0, elements = this.valau_idElements(); elements[i]; i++ ) {
					this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.valau_idClass );
				}
			}
			this.toHau_ide = this.toHau_ide.not( this.toShow );
			this.hau_ideErrors();
			this.addWrapper( this.toShow ).show();
		},
		
		valau_idElements: function() {
			return this.currentElements.not(this.invalau_idElements());
		},
		
		invalau_idElements: function() {
			return $(this.errorList).map(function() {
				return this.element;
			});
		},
		
		showLabel: function(element, message) {
			var label = this.errorsFor( element );
			if ( label.length ) {
				// refresh error/success class
				label.removeClass().addClass( this.settings.errorClass );
			
				// check if we have a generated label, replace the message then
				label.attr("generated") && label.html(message);
			} else {
				// create label
				label = $("<" + this.settings.errorElement + "/>")
					.attr({"for":  this.au_idOrName(element), generated: true})
					.addClass(this.settings.errorClass)
					.html(message || "");
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					label = label.hau_ide().show().wrap("<" + this.settings.wrapper + "/>").parent();
				}
				if ( !this.labelContainer.append(label).length )
					this.settings.errorPlacement
						? this.settings.errorPlacement(label, $(element) )
						: label.insertAfter(element);
			}
			if ( !message && this.settings.success ) {
				label.text("");
				typeof this.settings.success == "string"
					? label.addClass( this.settings.success )
					: this.settings.success( label );
			}
			this.toShow = this.toShow.add(label);
		},
		
		errorsFor: function(element) {
			var name = this.au_idOrName(element);
    		return this.errors().filter(function() {
				return $(this).attr('for') == name;
			});
		},
		
		au_idOrName: function(element) {
			return this.groups[element.name] || (this.checkable(element) ? element.name : element.au_id || element.name);
		},

		checkable: function( element ) {
			return /radio|checkbox/i.test(element.type);
		},
		
		findByName: function( name ) {
			// select by name and filter by form for performance over form.find("[name=...]")
			var form = this.currentForm;
			return $(document.getElementsByName(name)).map(function(index, element) {
				return element.form == form && element.name == name && element  || null;
			});
		},
		
		getLength: function(value, element) {
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				return $("option:selected", element).length;
			case 'input':
				if( this.checkable( element) )
					return this.findByName(element.name).filter(':checked').length;
			}
			return value.length;
		},
	
		depend: function(param, element) {
			return this.dependTypes[typeof param]
				? this.dependTypes[typeof param](param, element)
				: true;
		},
	
		dependTypes: {
			"boolean": function(param, element) {
				return param;
			},
			"string": function(param, element) {
				return !!$(param, element.form).length;
			},
			"function": function(param, element) {
				return param(element);
			}
		},
		
		optional: function(element) {
			return !$.valau_idator.methods.required.call(this, $.trim(element.value), element) && "dependency-mismatch";
		},
		
		startRequest: function(element) {
			if (!this.pending[element.name]) {
				this.pendingRequest++;
				this.pending[element.name] = true;
			}
		},
		
		stopRequest: function(element, valau_id) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if (this.pendingRequest < 0)
				this.pendingRequest = 0;
			delete this.pending[element.name];
			if ( valau_id && this.pendingRequest == 0 && this.formSubmitted && this.form() ) {
				$(this.currentForm).submit();
				this.formSubmitted = false;
			} else if (!valau_id && this.pendingRequest == 0 && this.formSubmitted) {
				$(this.currentForm).triggerHandler("invalau_id-form", [this]);
				this.formSubmitted = false;
			}
		},
		
		previousValue: function(element) {
			return $.data(element, "previousValue") || $.data(element, "previousValue", {
				old: null,
				valau_id: true,
				message: this.defaultMessage( element, "remote" )
			});
		}
		
	},
	
	classRuleSettings: {
		required: {required: true},
		email: {email: true},
		url: {url: true},
		date: {date: true},
		dateISO: {dateISO: true},
		dateDE: {dateDE: true},
		number: {number: true},
		numberDE: {numberDE: true},
		digits: {digits: true},
		creditcard: {creditcard: true}
	},
	
	addClassRules: function(className, rules) {
		/// <summary>
		/// Add a compound class method - useful to refactor common combinations of rules into a single
		/// class.
		/// </summary>
		/// <param name="name" type="String">
		/// The name of the class rule to add
		/// </param>
		/// <param name="rules" type="Options">
		/// The compound rules
		/// </param>
		/// <returns type="undefined" />

		className.constructor == String ?
			this.classRuleSettings[className] = rules :
			$.extend(this.classRuleSettings, className);
	},
	
	classRules: function(element) {
		var rules = {};
		var classes = $(element).attr('class');
		classes && $.each(classes.split(' '), function() {
			if (this in $.valau_idator.classRuleSettings) {
				$.extend(rules, $.valau_idator.classRuleSettings[this]);
			}
		});
		return rules;
	},
	
	attributeRules: function(element) {
		var rules = {};
		var $element = $(element);
		
		for (method in $.valau_idator.methods) {
			var value = $element.attr(method);
			if (value) {
				rules[method] = value;
			}
		}
		
		// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
		if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
			delete rules.maxlength;
		}
		
		return rules;
	},
	
	metadataRules: function(element) {
		if (!$.metadata) return {};
		
		var meta = $.data(element.form, 'valau_idator').settings.meta;
		return meta ?
			$(element).metadata()[meta] :
			$(element).metadata();
	},
	
	staticRules: function(element) {
		var rules = {};
		var valau_idator = $.data(element.form, 'valau_idator');
		if (valau_idator.settings.rules) {
			rules = $.valau_idator.normalizeRule(valau_idator.settings.rules[element.name]) || {};
		}
		return rules;
	},
	
	normalizeRules: function(rules, element) {
		// handle dependency check
		$.each(rules, function(prop, val) {
			// ignore rule when param is explicitly false, eg. required:false
			if (val === false) {
				delete rules[prop];
				return;
			}
			if (val.param || val.depends) {
				var keepRule = true;
				switch (typeof val.depends) {
					case "string":
						keepRule = !!$(val.depends, element.form).length;
						break;
					case "function":
						keepRule = val.depends.call(element, element);
						break;
				}
				if (keepRule) {
					rules[prop] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[prop];
				}
			}
		});
		
		// evaluate parameters
		$.each(rules, function(rule, parameter) {
			rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
		});
		
		// clean number parameters
		$.each(['minlength', 'maxlength', 'min', 'max'], function() {
			if (rules[this]) {
				rules[this] = Number(rules[this]);
			}
		});
		$.each(['rangelength', 'range'], function() {
			if (rules[this]) {
				rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
			}
		});
		
		if ($.valau_idator.autoCreateRanges) {
			// auto-create ranges
			if (rules.min && rules.max) {
				rules.range = [rules.min, rules.max];
				delete rules.min;
				delete rules.max;
			}
			if (rules.minlength && rules.maxlength) {
				rules.rangelength = [rules.minlength, rules.maxlength];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}
		
		// To support custom messages in metadata ignore rule methods au_lnamed "messages"
		if (rules.messages) {
			delete rules.messages;
		}
		
		return rules;
	},
	
	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function(data) {
		if( typeof data == "string" ) {
			var transformed = {};
			$.each(data.split(/\s/), function() {
				transformed[this] = true;
			});
			data = transformed;
		}
		return data;
	},
	
	// http://docs.jquery.com/Plugins/Valau_idation/Valau_idator/addMethod
	addMethod: function(name, method, message) {
		/// <summary>
		/// Add a custom valau_idation method. It must consist of a name (must be a legal javascript 
		/// au_identifier), a javascript based function and a default string message.
		/// </summary>
		/// <param name="name" type="String">
		/// The name of the method, used to au_identify and referencing it, must be a valau_id javascript
		/// au_identifier
		/// </param>
		/// <param name="method" type="Function">
		/// The actual method implementation, returning true if an element is valau_id
		/// </param>
		/// <param name="message" type="String" optional="true">
		/// (Optional) The default message to display for this method. Can be a function created by 
		/// jQuery.valau_idator.format(value). When undefined, an already existing message is used 
		/// (handy for localization), otherwise the field-specific messages have to be defined.
		/// </param>
		/// <returns type="undefined" />

		$.valau_idator.methods[name] = method;
		$.valau_idator.messages[name] = message != undefined ? message : $.valau_idator.messages[name];
		if (method.length < 3) {
			$.valau_idator.addClassRules(name, $.valau_idator.normalizeRule(name));
		}
	},

	methods: {

		// http://docs.jquery.com/Plugins/Valau_idation/Methods/required
		required: function(value, element, param) {
			// check if dependency is met
			if ( !this.depend(param, element) )
				return "dependency-mismatch";
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				// could be an array for select-multiple or a string, both are fine this way
				var val = $(element).val();
				return val && val.length > 0;
			case 'input':
				if ( this.checkable(element) )
					return this.getLength(value, element) > 0;
			default:
				return $.trim(value).length > 0;
			}
		},
		
		// http://docs.jquery.com/Plugins/Valau_idation/Methods/remote
		remote: function(value, element, param) {
			if ( this.optional(element) )
				return "dependency-mismatch";
			
			var previous = this.previousValue(element);
			if (!this.settings.messages[element.name] )
				this.settings.messages[element.name] = {};
			previous.originalMessage = this.settings.messages[element.name].remote;
			this.settings.messages[element.name].remote = previous.message;
			
			param = typeof param == "string" && {url:param} || param; 
			
			if ( previous.old !== value ) {
				previous.old = value;
				var valau_idator = this;
				this.startRequest(element);
				var data = {};
				data[element.name] = value;
				$.ajax($.extend(true, {
					url: param,
					mode: "abort",
					port: "valau_idate" + element.name,
					dataType: "json",
					data: data,
					success: function(response) {
						valau_idator.settings.messages[element.name].remote = previous.originalMessage;
						var valau_id = response === true;
						if ( valau_id ) {
							var submitted = valau_idator.formSubmitted;
							valau_idator.prepareElement(element);
							valau_idator.formSubmitted = submitted;
							valau_idator.successList.push(element);
							valau_idator.showErrors();
						} else {
							var errors = {};
							var message = (previous.message = response || valau_idator.defaultMessage( element, "remote" ));
							errors[element.name] = $.isFunction(message) ? message(value) : message;
							valau_idator.showErrors(errors);
						}
						previous.valau_id = valau_id;
						valau_idator.stopRequest(element, valau_id);
					}
				}, param));
				return "pending";
			} else if( this.pending[element.name] ) {
				return "pending";
			}
			return previous.valau_id;
		},

		// http://docs.jquery.com/Plugins/Valau_idation/Methods/minlength
		minlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) >= param;
		},
		
		// http://docs.jquery.com/Plugins/Valau_idation/Methods/maxlength
		maxlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) <= param;
		},
		
		// http://docs.jquery.com/Plugins/Valau_idation/Methods/rangelength
		rangelength: function(value, element, param) {
			var length = this.getLength($.trim(value), element);
			return this.optional(element) || ( length >= param[0] && length <= param[1] );
		},
		
		// http://docs.jquery.com/Plugins/Valau_idation/Methods/min
		min: function( value, element, param ) {
			return this.optional(element) || value >= param;
		},
		
		// http://docs.jquery.com/Plugins/Valau_idation/Methods/max
		max: function( value, element, param ) {
			return this.optional(element) || value <= param;
		},
		
		// http://docs.jquery.com/Plugins/Valau_idation/Methods/range
		range: function( value, element, param ) {
			return this.optional(element) || ( value >= param[0] && value <= param[1] );
		},
		
		// http://docs.jquery.com/Plugins/Valau_idation/Methods/email
		email: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_valau_idation/
			return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Valau_idation/Methods/url
		url: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		},
        
		// http://docs.jquery.com/Plugins/Valau_idation/Methods/date
		date: function(value, element) {
			return this.optional(element) || !/Invalau_id|NaN/.test(new Date(value));
		},
	
		// http://docs.jquery.com/Plugins/Valau_idation/Methods/dateISO
		dateISO: function(value, element) {
			return this.optional(element) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Valau_idation/Methods/number
		number: function(value, element) {
			return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Valau_idation/Methods/digits
		digits: function(value, element) {
			return this.optional(element) || /^\d+$/.test(value);
		},
		
		// http://docs.jquery.com/Plugins/Valau_idation/Methods/creditcard
		// based on http://en.wikipedia.org/wiki/Luhn
		creditcard: function(value, element) {
			if ( this.optional(element) )
				return "dependency-mismatch";
			// accept only digits and dashes
			if (/[^0-9-]+/.test(value))
				return false;
			var nCheck = 0,
				nDigit = 0,
				bEven = false;

			value = value.replace(/\D/g, "");

			for (var n = value.length - 1; n >= 0; n--) {
				var cDigit = value.charAt(n);
				var nDigit = parseInt(cDigit, 10);
				if (bEven) {
					if ((nDigit *= 2) > 9)
						nDigit -= 9;
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return (nCheck % 10) == 0;
		},
		
		// http://docs.jquery.com/Plugins/Valau_idation/Methods/accept
		accept: function(value, element, param) {
			param = typeof param == "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
			return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i")); 
		},
		
		// http://docs.jquery.com/Plugins/Valau_idation/Methods/equalTo
		equalTo: function(value, element, param) {
			// bind to the blur event of the target in order to revalau_idate whenever the target field is updated
			// TODO find a way to bind the event just once, avoau_iding the unbind-rebind overhead
			var target = $(param).unbind(".valau_idate-equalTo").bind("blur.valau_idate-equalTo", function() {
				$(element).valau_id();
			});
			return value == target.val();
		}
		
	}
	
});

// deprecated, use $.valau_idator.format instead
$.format = $.valau_idator.format;

})(jQuery);

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort() 
;(function($) {
	var ajax = $.ajax;
	var pendingRequests = {};
	$.ajax = function(settings) {
		// create settings for compatibility with ajaxSetup
		settings = $.extend(settings, $.extend({}, $.ajaxSettings, settings));
		var port = settings.port;
		if (settings.mode == "abort") {
			if ( pendingRequests[port] ) {
				pendingRequests[port].abort();
			}
			return (pendingRequests[port] = ajax.apply(this, arguments));
		}
		return ajax.apply(this, arguments);
	};
})(jQuery);

// provau_ides cross-browser focusin and focusout events
// IE has native support, in other browsers, use event caputuring (neither bubbles)

// provau_ides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target 
;(function($) {
	// only implement if not provau_ided by jQuery core (since 1.4)
	// TODO verify if jQuery 1.4's implementation is compatible with older jQuery special-event APIs
	if (!jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener) {
		$.each({
			focus: 'focusin',
			blur: 'focusout'	
		}, function( original, fix ){
			$.event.special[fix] = {
				setup:function() {
					this.addEventListener( original, handler, true );
				},
				teardown:function() {
					this.removeEventListener( original, handler, true );
				},
				handler: function(e) {
					arguments[0] = $.event.fix(e);
					arguments[0].type = fix;
					return $.event.handle.apply(this, arguments);
				}
			};
			function handler(e) {
				e = $.event.fix(e);
				e.type = fix;
				return $.event.handle.call(this, e);
			}
		});
	};
	$.extend($.fn, {
		valau_idateDelegate: function(delegate, type, handler) {
			return this.bind(type, function(event) {
				var target = $(event.target);
				if (target.is(delegate)) {
					return handler.apply(target, arguments);
				}
			});
		}
	});
})(jQuery);
