(function($){
  $.fn.extend({
    licencePlateForm : function() {
      this.each( function() {
        if ($(this).is("form")) {
          $(this).submit($.LicensePlate.onSubmit);
        }
        else {
          throw new Error("Works only with form elements");
        }
      });
      return this;
    }
  });

  $.LicensePlate = {
    parseData : function(input) {
      input = $(input);
      var preview = input.parents(".line").find(".preview");
      var data = input.val().split("-");

      if (data.length != 2) { return false; }
      
      var county = data[0];

      data = data[1].split(" ");
      if (data.length != 2) { return false; }

      var letters = data[0];
      var numbers = data[1];

      return {county : county, letters : letters, numbers : numbers }
    },
    transformCharacter : function(character) {
      if (character.match(/[0-9]/)) {
        return $.LicensePlate.transformNumber(character);
      }
      else if (character.match(/[a-zäöü]/)) {
        return $.LicensePlate.transformLetter(character.toUpperCase());
      }
      else if (character.match(/[A-ZÄÖÜ]/)) {
        return $.LicensePlate.transformLetter(character);
      }
      else if (character.match(/ /)) {
        return $.LicensePlate.generateWhitespace();
      }
      else {
        return false;
      }
    },
    transformLetter : function( letter ) {
      switch(letter) {
        case "Ä":
          return $("<span class='character letter AE'>" + letter + "</span>");
        case "Ö":
          return $("<span class='character letter OE'>" + letter + "</span>");
        case "Ü":
          return $("<span class='character letter UE'>" + letter + "</span>");
        default:
          return $("<span class='character letter " + letter + "'>" + letter + "</span>");
      }
    },
    transformNumber : function( num ) {
      return $("<span class='character number no" + num + "''>" + num + "</span>");
    },
    generateSeparator : function() {
      return $("<span class='separator'>-</span>");
    },
    generateWhitespace : function() {
      return $("<span class='whitespace'>&nbsp;</span>");
    },
    onSubmit : function(eve) {
      $(this).find("[name=data]").each(function(){
        var input = $(this);
        var plate = $.LicensePlate.parseData(input); 

        if (plate) {
          var previewElement = input.parents(".line").find(".preview");
          previewElement.html("");

          $.each(plate.county.match(/./g), function() {
            previewElement.append($.LicensePlate.transformCharacter(this));
          });

          previewElement.append($.LicensePlate.generateSeparator());

          $.each(plate.letters.match(/./g), function() {
            previewElement.append($.LicensePlate.transformCharacter(this));
          });

          previewElement.append($.LicensePlate.generateWhitespace());

          $.each(plate.numbers.match(/./g), function() {
            previewElement.append($.LicensePlate.transformCharacter(this));
          });
        }
      });

      
      return false;
    }
  };
})(jQuery);
