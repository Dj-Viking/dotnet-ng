using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Net.Http;
using System.Text.Json;
namespace dotnet_ng.Controllers;


[ApiController]
public class JokeController : ControllerBase
{
    private readonly ILogger<JokeController> _logger;
    private readonly IHttpClientFactory _httpClientFactory;

    public JokeController(
        IHttpClientFactory httpClientFactory,
        ILogger<JokeController> logger
    )
    {
        _logger = logger;
        _httpClientFactory = httpClientFactory;
    }

    private async Task<dynamic> HandleJokeApi(HttpClient httpClient, string urlSuffix, string type)
    {
        HttpResponseMessage httpRes =
            await httpClient.GetAsync(urlSuffix);

        if (httpRes.IsSuccessStatusCode)
        {
            using Stream contentStream =
                await httpRes.Content.ReadAsStreamAsync();

            if (contentStream is not null)
            {
                switch (type)
                {
                    case "random":
                        {
                            Joke? joke =
                                await JsonSerializer
                                    .DeserializeAsync<Joke>(contentStream)!;

                            return joke!;
                        }
                    case "categories":
                        {
                            List<string>? categories =
                                await JsonSerializer
                                    .DeserializeAsync<List<string>>(contentStream)!;

                            return categories!;
                        }
                    case "joke-with-category":
                        {
                            Joke? joke =
                                await JsonSerializer
                                    .DeserializeAsync<Joke>(contentStream)!;
                            return joke!;
                        }
                }

                return new Exception("did not pass valid query type");

            }
            else
            {
                return BadRequest(new { status = 500, error = "content stream was null" });
            }
        }
        else
        {
            return BadRequest(new { status = httpRes.StatusCode, error = "there was a problem fetching from chuck norris api" });
        }
    }

    [HttpGet]
    [Route("/api/joke")]
    public async Task<IActionResult> GetRandomJoke()
    {
        try
        {
            using (HttpClient httpClient = _httpClientFactory.CreateClient("chuck_norris"))
            {
                var result = await HandleJokeApi(httpClient, "/jokes/random", "random");

                if (result is Exception)
                    return BadRequest(new { error = result });

                else
                    return Ok(new { joke = result });

            }
        }
        catch (Exception e)
        {
            Console.WriteLine("error getting jokes {0}", e);

            return BadRequest(new { status = 500, error = e });
        }
    }

    [HttpGet]
    [Route("/api/joke-categories")]
    public async Task<IActionResult> GetCategories()
    {
        try
        {
            using (HttpClient httpClient = _httpClientFactory.CreateClient("chuck_norris"))
            {
                var result = await HandleJokeApi(httpClient, "/jokes/categories", "categories");

                if (result is Exception)
                    return BadRequest(new { error = result });

                else
                    return Ok(new { categories = result });
            }

        }
        catch (Exception e)
        {

            Console.WriteLine("error getting jokes {0}", e);

            return BadRequest(new { status = 500, error = e });
        }
    }
    [HttpGet]
    [Route("/api/joke-by-category/{category}")]
    public async Task<IActionResult> GetJokeByCategory([FromRoute] string category)
    {
        try
        {
            using (HttpClient httpClient = _httpClientFactory.CreateClient("chuck_norris"))
            {
                var result = await HandleJokeApi(httpClient, $"/jokes/random?category={category}", "joke-with-category");

                if (result is Exception)
                    return BadRequest(new { error = result });
                else
                    return Ok(new { joke = result });
            }

        }
        catch (Exception e)
        {

            Console.WriteLine("error getting jokes {0}", e);

            return BadRequest(new { status = 500, error = e });
        }
    }
}