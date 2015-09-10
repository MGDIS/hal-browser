HAL.Views.Inspector = Backbone.View.extend({
  initialize: function(opts) {
    this.vent = opts.vent;

    _.bindAll(this, 'renderDocumentation');
    _.bindAll(this, 'renderResponse');

    this.vent.bind('show-docs', this.renderDocumentation);
    this.vent.bind('response', this.renderResponse);
  },

  className: 'inspector span1',

  render: function() {
    this.$el.html(this.template());
      $('.inspector summary').first().addClass('vertical-text');
      $('.inspector summary').first().click(function() {
          if ($('.explorer').hasClass('span11')){
              $('.inspector summary').first().removeClass('vertical-text');
              $('.explorer').removeClass('span11').addClass('span6');
              $('.inspector').removeClass('span1').addClass('span6');
          } else {
              $('.inspector summary').first().addClass('vertical-text');
              $('.explorer').removeClass('span6').addClass('span11');
              $('.inspector').removeClass('span6').addClass('span1');
          }
      });
  },

  renderResponse: function(response) {
    var responseView = new HAL.Views.Response({ vent: this.vent });

    this.render();
    responseView.render(response);

    this.$el.children(0).append(responseView.el);
  },

  renderDocumentation: function(e) {
    var docView = new HAL.Views.Documenation({ vent: this.vent });

    this.render();
    docView.render(e.url);

    this.$el.children(0).append(docView.el);
  },

  template: function() {
    return '<details><summary class="section">Inspector</summary></details>';
  }
});
