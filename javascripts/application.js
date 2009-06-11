(function($){
  $.fn.extend({
    licencePlateForm : function() {
      this.each( function() {
        if ($(this).is("form")) {
          $(this).submit($.LicensePlate.onSubmit);
          $(this).data("classNames", $(this).attr("class")); 
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
    generateLink : function(code) {
      return $("<a href='?" + code + "'>" + code + "</a>");
    },
    codeStateMapping : {
      "A"   : "Bayern",
      "AA"  : "Baden-Württemberg",
      "AB"  : "Bayern",
      "ABG" : "Thüringen",
      "ABI" : "Sachsen-Anhalt",
      "AC"  : "Nordrhein-Westfalen",
      "AIC" : "Bayern",
      "AK"  : "Rheinland-Pfalz",
      "AM"  : "Bayern",
      "AN"  : "Bayern",
      "AÖ"  : "Bayern",
      "AP"  : "Thüringen",
      "AS"  : "Bayern",
      "AUR" : "Niedersachsen",
      "AW"  : "Rheinland-Pfalz",
      "AZ"  : "Rheinland-Pfalz",
      "B"   : "Berlin",
      "BA"  : "Bayern",
      "BAD" : "Baden-Württemberg",
      "BAR" : "Brandenburg",
      "BB"  : "Baden-Württemberg",
      "BBL" : "Brandenburg",
      "BC"  : "Baden-Württemberg",
      "BGL" : "Bayern",
      "BI"  : "Nordrhein-Westfalen",
      "BIR" : "Rheinland-Pfalz",
      "BIT" : "Rheinland-Pfalz",
      "BK"  : "Sachsen-Anhalt",
      "BL"  : "Baden-Württemberg",
      "BLK" : "Sachsen-Anhalt",
      "BM"  : "Nordrhein-Westfalen",
      "BN"  : "Nordrhein-Westfalen",
      "BO"  : "Nordrhein-Westfalen",
      "BOR" : "Nordrhein-Westfalen",
      "BOT" : "Nordrhein-Westfalen",
      "BRA" : "Niedersachsen",
      "BRB" : "Brandenburg",
      "BS"  : "Niedersachsen",
      "BT"  : "Bayern",
      "BÜS" : "Baden-Württemberg",
      "BWL" : "Baden-Württemberg",
      "BYL" : "Bayern",
      "BZ"  : "Sachsen",
      "C"   : "Sachsen",
      "CB"  : "Brandenburg",
      "CE"  : "Niedersachsen",
      "CHA" : "Bayern",
      "CLP" : "Niedersachsen",
      "CO"  : "Bayern",
      "COC" : "Rheinland-Pfalz",
      "COE" : "Nordrhein-Westfalen",
      "CUX" : "Niedersachsen",
      "CW"  : "Baden-Württemberg",
      "D"   : "Nordrhein-Westfalen",
      "DA"  : "Hessen",
      "DAH" : "Bayern",
      "DAN" : "Niedersachsen",
      "DAU" : "Rheinland-Pfalz",
      "DBR" : "Mecklenburg-Vorpommern",
      "DD"  : "Sachsen",
      "DE"  : "Sachsen-Anhalt",
      "DEG" : "Bayern",
      "DEL" : "Niedersachsen",
      "DGF" : "Bayern",
      "DH"  : "Niedersachsen",
      "DLG" : "Bayern",
      "DM"  : "Mecklenburg-Vorpommern",
      "DN"  : "Nordrhein-Westfalen",
      "DO"  : "Nordrhein-Westfalen",
      "DON" : "Bayern",
      "DU"  : "Nordrhein-Westfalen",
      "DÜW" : "Rheinland-Pfalz",
      "E"   : "Nordrhein-Westfalen",
      "EA"  : "Thüringen",
      "EBE" : "Bayern",
      "ED"  : "Bayern",
      "EE"  : "Brandenburg",
      "EF"  : "Thüringen",
      "EI"  : "Bayern",
      "EIC" : "Thüringen",
      "EL"  : "Niedersachsen",
      "EM"  : "Baden-Württemberg",
      "EMD" : "Niedersachsen",
      "EMS" : "Rheinland-Pfalz",
      "EN"  : "Nordrhein-Westfalen",
      "ER"  : "Bayern",
      "ERB" : "Hessen",
      "ERH" : "Bayern",
      "ERZ" : "Sachsen",
      "ES"  : "Baden-Württemberg",
      "ESW" : "Hessen",
      "EU"  : "Nordrhein-Westfalen",
      "F"   : "Hessen",
      "FB"  : "Hessen",
      "FD"  : "Hessen",
      "FDS" : "Baden-Württemberg",
      "FF"  : "Brandenburg",
      "FFB" : "Bayern",
      "FG"  : "Sachsen",
      "FL"  : "Schleswig-Holstein",
      "FN"  : "Baden-Württemberg",
      "FO"  : "Bayern",
      "FR"  : "Baden-Württemberg",
      "FRG" : "Bayern",
      "FRI" : "Niedersachsen",
      "FS"  : "Bayern",
      "FT"  : "Rheinland-Pfalz",
      "FÜ"  : "Bayern",
      "G"   : "Thüringen",
      "GAP" : "Bayern",
      "GE"  : "Nordrhein-Westfalen",
      "GER" : "Rheinland-Pfalz",
      "GF"  : "Niedersachsen",
      "GG"  : "Hessen",
      "GI"  : "Hessen",
      "GL"  : "Nordrhein-Westfalen",
      "GM"  : "Nordrhein-Westfalen",
      "GÖ"  : "Niedersachsen",
      "GP"  : "Baden-Württemberg",
      "GR"  : "Sachsen",
      "GRZ" : "Thüringen",
      "GS"  : "Niedersachsen",
      "GT"  : "Nordrhein-Westfalen",
      "GTH" : "Thüringen",
      "GÜ"  : "Mecklenburg-Vorpommern",
      "GZ"  : "Bayern",
      "H"   : "Niedersachsen",
      "HA"  : "Nordrhein-Westfalen",
      "HAL" : "Sachsen-Anhalt",
      "HAM" : "Nordrhein-Westfalen",
      "HAS" : "Bayern",
      "HB"  : "Bremen",
      "HBN" : "Thüringen",
      "HD"  : "Baden-Württemberg",
      "HDH" : "Baden-Württemberg",
      "HE"  : "Niedersachsen",
      "HEF" : "Hessen",
      "HEI" : "Schleswig-Holstein",
      "HEL" : "Hessen",
      "HER" : "Nordrhein-Westfalen",
      "HF"  : "Nordrhein-Westfalen",
      "HG"  : "Hessen",
      "HGW" : "Mecklenburg-Vorpommern",
      "HH"  : "Hamburg",
      "HI"  : "Niedersachsen",
      "HL"  : "Schleswig-Holstein",
      "HM"  : "Niedersachsen",
      "HN"  : "Baden-Württemberg",
      "HO"  : "Bayern",
      "HOL" : "Niedersachsen",
      "HOM" : "Saarland",
      "HP"  : "Hessen",
      "HR"  : "Hessen",
      "HRO" : "Mecklenburg-Vorpommern",
      "HS"  : "Nordrhein-Westfalen",
      "HSK" : "Nordrhein-Westfalen",
      "HST" : "Mecklenburg-Vorpommern",
      "HU"  : "Hessen",
      "HVL" : "Brandenburg",
      "HWI" : "Mecklenburg-Vorpommern",
      "HX"  : "Nordrhein-Westfalen",
      "HZ"  : "Sachsen-Anhalt",
      "IGB" : "Saarland",
      "IK"  : "Thüringen",
      "IN"  : "Bayern",
      "IZ"  : "Schleswig-Holstein",
      "J"   : "Thüringen",
      "JL"  : "Sachsen-Anhalt",
      "K"   : "Nordrhein-Westfalen",
      "KA"  : "Baden-Württemberg",
      "KB"  : "Hessen",
      "KC"  : "Bayern",
      "KE"  : "Bayern",
      "KEH" : "Bayern",
      "KF"  : "Bayern",
      "KG"  : "Bayern",
      "KH"  : "Rheinland-Pfalz",
      "KI"  : "Schleswig-Holstein",
      "KIB" : "Rheinland-Pfalz",
      "KL"  : "Rheinland-Pfalz",
      "KLE" : "Nordrhein-Westfalen",
      "KN"  : "Baden-Württemberg",
      "KO"  : "Rheinland-Pfalz",
      "KR"  : "Nordrhein-Westfalen",
      "KS"  : "Hessen",
      "KT"  : "Bayern",
      "KU"  : "Bayern",
      "KÜN" : "Baden-Württemberg",
      "KUS" : "Rheinland-Pfalz",
      "KYF" : "Thüringen",
      "L"   : "Sachsen",
      "LA"  : "Bayern",
      "LAU" : "Bayern",
      "LB"  : "Baden-Württemberg",
      "LD"  : "Rheinland-Pfalz",
      "LDK" : "Hessen",
      "LDS" : "Brandenburg",
      "LER" : "Niedersachsen",
      "LEV" : "Nordrhein-Westfalen",
      "LG"  : "Niedersachsen",
      "LI"  : "Bayern",
      "LIF" : "Bayern",
      "LIP" : "Nordrhein-Westfalen",
      "LL"  : "Bayern",
      "LM"  : "Hessen",
      "LÖ"  : "Baden-Württemberg",
      "LOS" : "Brandenburg",
      "LSA" : "Sachsen-Anhalt",
      "LSN" : "Sachsen",
      "LU"  : "Rheinland-Pfalz",
      "LWL" : "Mecklenburg-Vorpommern",
      "M"   : "Bayern",
      "MA"  : "Baden-Württemberg",
      "MB"  : "Bayern",
      "MD"  : "Sachsen-Anhalt",
      "ME"  : "Nordrhein-Westfalen",
      "MEI" : "Sachsen",
      "MG"  : "Nordrhein-Westfalen",
      "MH"  : "Nordrhein-Westfalen",
      "MI"  : "Nordrhein-Westfalen",
      "MIL" : "Bayern",
      "MK"  : "Nordrhein-Westfalen",
      "MKK" : "Hessen",
      "MM"  : "Bayern",
      "MN"  : "Bayern",
      "MOL" : "Brandenburg",
      "MOS" : "Baden-Württemberg",
      "MR"  : "Hessen",
      "MS"  : "Nordrhein-Westfalen",
      "MSH" : "Sachsen-Anhalt",
      "MSP" : "Bayern",
      "MST" : "Mecklenburg-Vorpommern",
      "MTK" : "Hessen",
      "MÜ"  : "Bayern",
      "MÜR" : "Mecklenburg-Vorpommern",
      "MVL" : "Mecklenburg-Vorpommern",
      "MYK" : "Rheinland-Pfalz",
      "MZ"  : "Rheinland-Pfalz",
      "MZG" : "Saarland",
      "N"   : "Bayern",
      "NB"  : "Mecklenburg-Vorpommern",
      "ND"  : "Bayern",
      "NDH" : "Thüringen",
      "NE"  : "Nordrhein-Westfalen",
      "NEA" : "Bayern",
      "NES" : "Bayern",
      "NEW" : "Bayern",
      "NF"  : "Schleswig-Holstein",
      "NI"  : "Niedersachsen",
      "NK"  : "Saarland",
      "NL"  : "Niedersachsen",
      "NM"  : "Bayern",
      "NMS" : "Schleswig-Holstein",
      "NOH" : "Niedersachsen",
      "NOM" : "Niedersachsen",
      "NR"  : "Rheinland-Pfalz",
      "NRW" : "Nordrhein-Westfalen",
      "NU"  : "Bayern",
      "NVP" : "Mecklenburg-Vorpommern",
      "NW"  : "Rheinland-Pfalz",
      "NWM" : "Mecklenburg-Vorpommern",
      "OA"  : "Bayern",
      "OAL" : "Bayern",
      "OB"  : "Nordrhein-Westfalen",
      "OD"  : "Schleswig-Holstein",
      "OE"  : "Nordrhein-Westfalen",
      "OF"  : "Hessen",
      "OG"  : "Baden-Württemberg",
      "OH"  : "Schleswig-Holstein",
      "OHA" : "Niedersachsen",
      "OHV" : "Brandenburg",
      "OHZ" : "Niedersachsen",
      "OL"  : "Niedersachsen",
      "OPR" : "Brandenburg",
      "OS"  : "Niedersachsen",
      "OSL" : "Brandenburg",
      "OVP" : "Mecklenburg-Vorpommern",
      "P"   : "Brandenburg",
      "PA"  : "Bayern",
      "PAF" : "Bayern",
      "PAN" : "Bayern",
      "PB"  : "Nordrhein-Westfalen",
      "PCH" : "Mecklenburg-Vorpommern",
      "PE"  : "Niedersachsen",
      "PF"  : "Baden-Württemberg",
      "PI"  : "Schleswig-Holstein",
      "PIR" : "Sachsen",
      "PLÖ" : "Schleswig-Holstein",
      "PM"  : "Brandenburg",
      "PR"  : "Brandenburg",
      "PS"  : "Rheinland-Pfalz",
      "R"   : "Bayern",
      "RA"  : "Baden-Württemberg",
      "RD"  : "Schleswig-Holstein",
      "RE"  : "Nordrhein-Westfalen",
      "REG" : "Bayern",
      "RH"  : "Bayern",
      "RO"  : "Bayern",
      "ROW" : "Niedersachsen",
      "RP"  : "Rheinland-Pfalz",
      "RPL" : "Rheinland-Pfalz",
      "RS"  : "Nordrhein-Westfalen",
      "RT"  : "Baden-Württemberg",
      "RÜD" : "Hessen",
      "RÜG" : "Mecklenburg-Vorpommern",
      "RV"  : "Baden-Württemberg",
      "RW"  : "Baden-Württemberg",
      "RZ"  : "Schleswig-Holstein",
      "S"   : "Baden-Württemberg",
      "SAD" : "Bayern",
      "SAL" : "Saarland",
      "SAW" : "Sachsen-Anhalt",
      "SB"  : "Saarland",
      "SC"  : "Bayern",
      "SDL" : "Sachsen-Anhalt",
      "SE"  : "Schleswig-Holstein",
      "SFA" : "Niedersachsen",
      "SG"  : "Nordrhein-Westfalen",
      "SH"  : "Schleswig-Holstein",
      "SHA" : "Baden-Württemberg",
      "SHG" : "Niedersachsen",
      "SHK" : "Thüringen",
      "SHL" : "Thüringen",
      "SI"  : "Nordrhein-Westfalen",
      "SIG" : "Baden-Württemberg",
      "SIM" : "Rheinland-Pfalz",
      "SK"  : "Sachsen-Anhalt",
      "SL"  : "Schleswig-Holstein",
      "SLF" : "Thüringen",
      "SLK" : "Sachsen-Anhalt",
      "SLS" : "Saarland",
      "SM"  : "Thüringen",
      "SN"  : "Mecklenburg-Vorpommern",
      "SO"  : "Nordrhein-Westfalen",
      "SOK" : "Thüringen",
      "SÖM" : "Thüringen",
      "SON" : "Thüringen",
      "SP"  : "Rheinland-Pfalz",
      "SPN" : "Brandenburg",
      "SR"  : "Bayern",
      "ST"  : "Nordrhein-Westfalen",
      "STA" : "Bayern",
      "STD" : "Niedersachsen",
      "SU"  : "Nordrhein-Westfalen",
      "SÜW" : "Rheinland-Pfalz",
      "SW"  : "Bayern",
      "SZ"  : "Niedersachsen",
      "TBB" : "Baden-Württemberg",
      "TDO" : "Sachsen",
      "TF"  : "Brandenburg",
      "THL" : "Thüringen",
      "THW" : "Technisches Hilfswerk",
      "TIR" : "Bayern",
      "TÖL" : "Bayern",
      "TR"  : "Rheinland-Pfalz",
      "TS"  : "Bayern",
      "TÜ"  : "Baden-Württemberg",
      "TUT" : "Baden-Württemberg",
      "UE"  : "Niedersachsen",
      "UER" : "Mecklenburg-Vorpommern",
      "UH"  : "Thüringen",
      "UL"  : "Baden-Württemberg",
      "UM"  : "Brandenburg",
      "UN"  : "Nordrhein-Westfalen",
      "V"   : "Sachsen",
      "VB"  : "Hessen",
      "VEC" : "Niedersachsen",
      "VER" : "Niedersachsen",
      "VIE" : "Nordrhein-Westfalen",
      "VK"  : "Saarland",
      "VS"  : "Baden-Württemberg",
      "W"   : "Nordrhein-Westfalen",
      "WAF" : "Nordrhein-Westfalen",
      "WAK" : "Thüringen",
      "WB"  : "Sachsen-Anhalt",
      "WE"  : "Thüringen",
      "WEN" : "Bayern",
      "WES" : "Nordrhein-Westfalen",
      "WF"  : "Niedersachsen",
      "WHV" : "Niedersachsen",
      "WI"  : "Hessen",
      "WIL" : "Rheinland-Pfalz",
      "WL"  : "Niedersachsen",
      "WM"  : "Bayern",
      "WN"  : "Baden-Württemberg",
      "WND" : "Saarland",
      "WO"  : "Rheinland-Pfalz",
      "WOB" : "Niedersachsen",
      "WST" : "Niedersachsen",
      "WT"  : "Baden-Württemberg",
      "WTM" : "Niedersachsen",
      "WÜ"  : "Bayern",
      "WUG" : "Bayern",
      "WUN" : "Bayern",
      "WW"  : "Rheinland-Pfalz",
      "Z"   : "Sachsen",
      "ZW"  : "Rheinland-Pfalz"
    },
    stateClassMapping : {
      "Baden-Württemberg"      : "baden_wuerttemberg",
      "Bayern"                 : "bayern",
      "Berlin"                 : "berlin",
      "Brandenburg"            : "brandenburg",
      "Bremen"                 : "bremen",
      "Hamburg"                : "hamburg",
      "Hessen"                 : "hessen",
      "Mecklenburg-Vorpommern" : "mecklenburg_vorpommern",
      "Niedersachen"           : "niedersachsen",
      "Nordrhein-Westfalen"    : "nordrhein_westfalen",
      "Rheinland-Pfalz"        : "rheinland_pfalz",
      "Saarland"               : "saarland",
      "Sachsen-Anhalt"         : "sachsen_anhalt",
      "Sachsen"                : "sachsen",
      "Schleswig-Holstein"     : "schleswig_holstein",
      "Thüringen"              : "thueringen"
    },
    state : function(county) {
      return $.LicensePlate.codeStateMapping[county];
    },
    stateCode : function(county) {
      return $.LicensePlate.stateClassMapping[$.LicensePlate.state(county)];
    },
    resetCssClasses : function(element) {
      element = $(element);
      if (element.data("classNames")) {
        element.attr("class", element.data("classNames"))
      }
      else {
        element.data("classNames", element.attr("class"));
      }
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

          $.LicensePlate.resetCssClasses(previewElement);
          previewElement.addClass($.LicensePlate.stateCode(plate.county));

          var separator = $.LicensePlate.generateSeparator();
          separator.attr("title", $.LicensePlate.state(plate.county));
          previewElement.append(separator);

          $.each(plate.letters.match(/./g), function() {
            previewElement.append($.LicensePlate.transformCharacter(this));
          });

          previewElement.append($.LicensePlate.generateWhitespace());

          $.each(plate.numbers.match(/./g), function() {
            previewElement.append($.LicensePlate.transformCharacter(this));
          });

          previewElement.append("<br />");

          previewElement.append($.LicensePlate.generateLink(input.val()));
        }
      });

      
      return false;
    }
  };
})(jQuery);
