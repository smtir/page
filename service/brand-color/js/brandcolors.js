var BrandColors = {

  utilities: {

    isInArray: function( value, array ) {
      return array.indexOf( value ) > -1;
    },

    sortNumber: function( a, b ) {
      return a - b;
    },

  },

  collection: {

    brands: [],

    getBrandCount: function() {
      return this.brands.length;
    },

    haveBrands: function() {
      return this.getBrandCount() > 0;
    },

    haveUrlBrands: function() {
      return window.location.search.indexOf( '?brands=' ) > -1;
    },

    getUrlBrands: function() {
      return window.location.search.split( '&' )[0].replace( '?brands=', '' ).split( ',' );
    },

    processInitialBrands: function() {
      if ( this.haveUrlBrands() ) {
        var brands = this.getUrlBrands();

        for ( var i = 0; i < brands.length; i++ ) {
          this.toggleBrand( brands[i] );
        }
      }

      this.updateCollection();
    },

    buildUrlParams: function() {
      var params = '';

      if ( this.haveBrands() ) {
        params += '?brands=';
      }

      for ( var i = 0; i < this.getBrandCount(); i++ ) {
        params += this.brands[i];

        if ( i + 1 !== this.getBrandCount() ) {
          params += ',';
        }
      }

      return params;
    },

    buildShareUrl: function() {
      return window.location.origin + this.buildUrlParams();
    },

    buildDownloadUrl: function() {
      return window.location.origin + '/download/' + this.buildUrlParams();
    },

    downloadAll: function( format ) {
      window.location = window.location.origin + '/download/?format=' + format;
    },

    updateCollection: function() {
      var el      = jQuery( '.collection-tools' );
      var count   = this.getBrandCount();
      var message = count + ( count !== 1 ? ' brands ' : ' brand ' ) + 'in collection';

      if ( this.haveBrands() ) {
        el.removeClass( 'is-disabled' );
      } else {
        el.addClass( 'is-disabled' );
      }

      jQuery( '.collection-label' ).text( message );
    },

    downloadCollection: function( format ) {
      window.location = window.location.origin + '/download/' + this.buildUrlParams() + '&format=' + format;
    },

    shareCollection: function() {
      prompt( "Here's the URL to share!", this.buildShareUrl() );
    },

    clearCollection: function() {
      this.brands = [];

      jQuery( '.brand' ).removeClass( 'is-collected' );

      this.updateCollection();
    },

    toggleBrand: function( id ) {
      id = parseInt( id );

      jQuery( '#brand-' + id ).toggleClass( 'is-collected' );

      if ( BrandColors.utilities.isInArray( id, this.brands ) ) {
        var index = this.brands.indexOf( id );

        if ( index > -1 ) {
          this.brands.splice( index, 1 )
        }
      } else {
        this.brands.push( id );
      }

      this.brands.sort( BrandColors.utilities.sortNumber );

      this.updateCollection();
    },

  },

  components: {

    searchform: {

      el: '#search',

      search: function() {
        var term = jQuery( this.el ).val().toLowerCase();

        jQuery( '.brand' ).each( function() {
          var $self     = jQuery( this ),
              brandName = $self.data( 'brand-name' ).toLowerCase();

          if ( brandName.indexOf( term ) > -1 ) {
            $self.removeClass( 'is-hidden' );
          } else {
            $self.addClass( 'is-hidden' );
          }
        } );
      },

    },

    color: {

      getLuminosity: function( hex ) {
        var color = Color( '#' + hex );

        if ( color.luminosity() > .7 ) {
          return 'light'
        }

        return 'dark';
      },

    },

  },

};

jQuery( document ).ready( function( $ ) {

  BrandColors.collection.processInitialBrands();

  BrandColors.collection.updateCollection();

  $( '#download-collection' ).change( function() {
    var format = $( this ).find( 'option:selected' ).val();

    if ( format === 'none' ) {
      alert( 'Please select a download format.' );
    } else {
      BrandColors.collection.downloadCollection( format );
    }
  } );

  $( '#share-collection' ).click( function( ev ) {
    BrandColors.collection.shareCollection();

    ev.preventDefault();
  } );

  $( '#clear-collection' ).click( function( ev ) {
    BrandColors.collection.clearCollection();

    ev.preventDefault();
  } );

  $( BrandColors.components.searchform.el ).keyup( function() {
    BrandColors.components.searchform.search();
  } );

  $( '#download-all' ).change( function() {
    var format = $( this ).find( 'option:selected' ).val();

    if ( format === 'none' ) {
      alert( 'Please select a download format.' );
    } else {
      BrandColors.collection.downloadAll( format );
    }
  } );

  $( '.brand' ).click( function() {
    BrandColors.collection.toggleBrand( $( this ).data( 'brand-id' ) );
  } );

  $( '.color' ).each( function() {
    $( this ).find( '.color-inner' ).addClass( BrandColors.components.color.getLuminosity( $( this ).data( 'color-hex' ) ) );
  } );

  $( '.color-code' ).click( function() {
    $( this ).select();
  } );

  $( '.brand .color-code' ).click( function( ev ) {
    ev.stopPropagation();
  } );

} );

try{Typekit.load();}catch(e){}