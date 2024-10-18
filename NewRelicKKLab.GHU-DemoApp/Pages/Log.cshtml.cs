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

        public async Task OnGet([FromQuery]int duration=60)
        {
            for (int i = 0; i < 100; i++)
            {
                // Log a message to the console
                System.Console.WriteLine($"This is a console log message {i} at {DateTime.Now:G}");
                // Log a message to the output window
                System.Diagnostics.Debug.WriteLine($"This is a debug output message {i} at {DateTime.Now:G}");
                _logger.LogInformation($"This is an information log message {i} at {DateTime.Now:G}");
                await Task.Delay(TimeSpan.FromMilliseconds(duration * 1000 / 100));
            }
        }
    }
}
