using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace NewRelicKKLab.GHU_DemoApp.Pages
{
    public class LogModel : PageModel
    {

        private readonly ILogger<IndexModel> _logger;

        public LogModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public async Task OnGet([FromQuery] int duration = 60, [FromQuery] int total = 100)
        {
            for (int i = 0; i < total; i++)
            {
                _logger.LogInformation("This is an information log message {Index} at {Time}", i, DateTime.Now);
                await Task.Delay(TimeSpan.FromMilliseconds(duration * 1000 / total));
            }
        }
    }
}
