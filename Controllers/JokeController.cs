using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Net.Http;
using System.Text.Json;
namespace dotnet_ng.Controllers;


[ApiController]
[Route("/joke")]
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

    [HttpPost]
    [Route("/joke")]
    public async Task<IActionResult> GetRandomJoke()
    {
        try
        {
            using (HttpClient httpClient = _httpClientFactory.CreateClient("chuck_norris"))
            {
                HttpResponseMessage httpRes = await httpClient.GetAsync(
                    "/jokes/random");

                if (httpRes.IsSuccessStatusCode)
                {
                    using Stream contentStream =
                        await httpRes.Content.ReadAsStreamAsync();

                    if (contentStream is not null)
                    {
                        Joke? joke =
                            await JsonSerializer
                                .DeserializeAsync<Joke>(contentStream)!;

                        return Ok(new { joke = joke });
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


        }
        catch (Exception e)
        {
            Console.WriteLine("error getting jokes {0}", e);

            return BadRequest(new { status = 500, error = e });
        }
    }

    [HttpGet]
    [Route("/joke-categories")]
    public async Task<IActionResult> GetCategories()
    {
        try
        {
            using (HttpClient httpClient = _httpClientFactory.CreateClient("chuck_norris"))
            {
                HttpResponseMessage httpRes = await httpClient.GetAsync(
                    "/jokes/categories");

                if (httpRes.IsSuccessStatusCode)
                {
                    using Stream contentStream =
                        await httpRes.Content.ReadAsStreamAsync();

                    if (contentStream is not null)
                    {
                        List<string>? categories =
                            await JsonSerializer
                                .DeserializeAsync<List<string>>(contentStream)!;

                        return Ok(new { categories = categories });
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

        }
        catch (Exception e)
        {

            Console.WriteLine("error getting jokes {0}", e);

            return BadRequest(new { status = 500, error = e });
        }
    }
    [HttpGet]
    [Route("/joke-by-category/{category}")]
    public async Task<IActionResult> GetJokeByCategory([FromRoute] string category)
    {
        try
        {
            using (HttpClient httpClient = _httpClientFactory.CreateClient("chuck_norris"))
            {
                HttpResponseMessage httpRes = await httpClient.GetAsync(
                    $"/jokes/random?category={category}");

                if (httpRes.IsSuccessStatusCode)
                {
                    using Stream contentStream =
                        await httpRes.Content.ReadAsStreamAsync();

                    if (contentStream is not null)
                    {
                        Joke? joke =
                            await JsonSerializer
                                .DeserializeAsync<Joke>(contentStream)!;

                        return Ok(new { joke = joke });
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

        }
        catch (Exception e)
        {

            Console.WriteLine("error getting jokes {0}", e);

            return BadRequest(new { status = 500, error = e });
        }
    }
}