<footer class="row" >
  <div class="fin col s10  teal lighten-4 "></div>
  <div class="fin col s2   blue-grey lighten-5 "></div>


</footer>

 <!--  Scripts-->
<script src="<?php echo base_url('assets/js/materialize.js') ?>"></script>
<script src="<?php echo base_url('assets/js/init.js') ?>"></script>


<!-- codigo pushpin -->
    <script>
      $(document).ready(function(){
        $('.pushpin-demo-nav').each(function() {
          var $this = $(this);
          var $target = $('#' + $(this).attr('data-target'));
          $this.pushpin({
            top: $target.offset().top,
            bottom: $target.offset().top + $target.outerHeight() - $this.height()
          });
      });
        $('.target').pushpin({
          top: 0,
          bottom: 1000,
          offset: 0
        });

      });
    </script>


<!-- codigo carousel -->
 <script> $(document).ready(function() {
  $(".slider").slider({
    full_width: true,
    height : 600,
    interval: 5000 });
});
</script>
<!-- Inicializacion de aos-->
 <script> AOS.init();</script>

</body>

<style>
   footer, .fin{
    height: 10vh
   }
</style>
</html>
