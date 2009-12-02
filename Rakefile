namespace :analytics do
  desc 'Insert Google Analytics tracking code index.html.'
  task :insert do
    js = %q|<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
try {
var pageTracker = _gat._getTracker("UA-117680-1");
pageTracker._setDomainName(".benpickles.com");
pageTracker._trackPageview();
} catch(err) {}</script>|

    Dir['public/*.html'].each do |path|
      html = File.read(path)
      html.sub!('</body>', "#{js}\n</body>")
      File.open(path, 'w') do |f|
        f.write html
      end
    end
  end
end
