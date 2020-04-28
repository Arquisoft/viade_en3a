package viade

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class Simulation1 extends Simulation {

	val httpProtocol = http
		.baseUrl("https://solid.community")
		.inferHtmlResources()
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0")

	val headers_0 = Map("Origin" -> "http://localhost:3000")

	val headers_1 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_3 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Origin" -> "https://solid.community",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_4 = Map(
		"Accept" -> "text/turtle",
		"Origin" -> "http://localhost:3000",
		"authorization" -> "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkMmJiZDk0Zjg1MmNmMjYyNzZlZTg5ZTgzNGUyMjRlZiIsImF1ZCI6Imh0dHBzOi8vdmlhZGVlbjNhLnNvbGlkLmNvbW11bml0eSIsImV4cCI6MTU4ODEwMDczMSwiaWF0IjoxNTg4MDk3MTMxLCJpZF90b2tlbiI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW10cFpDSTZJbTAyYUdSclNuUjVRVXBOSW4wLmV5SnBjM01pT2lKb2RIUndjem92TDNOdmJHbGtMbU52YlcxMWJtbDBlU0lzSW5OMVlpSTZJbWgwZEhCek9pOHZkbWxoWkdWbGJqTmhMbk52Ykdsa0xtTnZiVzExYm1sMGVTOXdjbTltYVd4bEwyTmhjbVFqYldVaUxDSmhkV1FpT2lKa01tSmlaRGswWmpnMU1tTm1Nall5TnpabFpUZzVaVGd6TkdVeU1qUmxaaUlzSW1WNGNDSTZNVFU0T1RNd05qY3lNU3dpYVdGMElqb3hOVGc0TURrM01USXhMQ0pxZEdraU9pSXlNRFJqTnpJMk1qUXlPVEJsTnpVeUlpd2libTl1WTJVaU9pSlNOMjlmWldKQmRHOW9NRFJHVjJwcFpYZzRTVmRwUVRSNE1HcHhXREpGYzNCM09GOVFRbTVrWTJOUklpd2lZWHB3SWpvaVpESmlZbVE1TkdZNE5USmpaakkyTWpjMlpXVTRPV1U0TXpSbE1qSTBaV1lpTENKamJtWWlPbnNpYW5kcklqcDdJbUZzWnlJNklsSlRNalUySWl3aVpTSTZJa0ZSUVVJaUxDSmxlSFFpT25SeWRXVXNJbXRsZVY5dmNITWlPbHNpZG1WeWFXWjVJbDBzSW10MGVTSTZJbEpUUVNJc0ltNGlPaUowUkRObmRHODNRUzFuUzJkUVpVSnphM0UyTWpNd2QzRTFReTFSUkRsSVdXaE1PVVl6UzJKNmQxOTZjVXAxYWxwSlExTmtjelo1YkVsbWExZHlMWEIyY2xSS1NsZDJTakF5VW1kTVpXVjVVVkpFTjFGUFdXOUZVRkZDYzJKM1JHcERabVZtZDFwM1EzQlBkR2xwYlcxdVJtbGZabmhJUTBKMk5GcDNWelptTW1aNVZsOTVWVWswYVdkaVUyRnBNVlJqVW1aVGVVZFJNR2N6TW5nMlNVTk1lVUo2U2tWbmVVc3plVWhHVUdWeFJESmFaRkJIU0hreWNUbENWelYxU1daeE1XMHhRWGx4TVVwTlUzUnhNMHQwVmxoaGRuUkhkR3hIWDFaRmFXRlJXRkZqVWtGU1JERlZWR0pvWmpGdWRUaFlaVEZqWTNWTVJHMUhlRXRvZGtaNlpsSnVSUzAzVmtaSk56QlpTV0ZmTlhKcmQzaFljRFJsYjI1dFpHSnhTamhmVWtJeFNHdGplSGRyWVc1S09GTnZZMnRrU1ZCWWNHdDZlbDlWU1RoeU4zSlhRMHBRUm5OTWRVY3lVeTF3YW01alJqTnJXRkVpZlgwc0ltRjBYMmhoYzJnaU9pSmpPRFZrYkVRNGNEWkxVMW93TkZsRGNGbEdYMkZCSW4wLmVTb0FDSEwzSmczU1A3LXBKZHB0UHp5OGl3eVRHMEtOUXkxUC01STdkWXhKOXJoRHlfV050V3lIU2hFWTQwQ2hrd3RIYVNxVDEzSkFXT2ZvQjE5TEhsbUFkY3JyalA4M2N0RnZhczhieVpjbHFwa3F5cmdBY3dhSFZ2enpRblJFUnF2dV80SEM5emctSENQWDBZN0o4eU1yX2hfQm5FWTFOV1NULWFtVXlyY1BERHBQbHF0ajJ1NUhGZFlycUtPX0J1TGJjY3ZUdFVpNU1OX2VIZmt0dFRBc2QyZVVnal9BdmRjanRuZTk4SnpBNVpHRFNrOHlyRmlfcVhmalphX2hQajhrYUlCUUh3T2tDNWpQNUxIX0taeTgzNXl0Wmt4dlN4UmxHN1ZYcE1mUFRWUFZmczIxOGRzTlotZVgzcjlOVXR5OUg2MlBjbkhwcWMwTGFoOEVzdyIsInRva2VuX3R5cGUiOiJwb3AifQ.KSHd9rWfxstFCBguSZp4I_UIX3kXrZ90hEeYMDcrUSnbsp8YzDJ0hAVLH_uEigDHZAghk9OpIM5glutRUKVJOHdOcHZDzWCU884uYcVRW1QKjwj521m62x4oXjedOIrgA17OK5R8WkR5CViJyRyxplv8umQu71nATNwcYvQRHYw9MKpBtdh4dreBGuxqxInWjO3TiSi10jkBU7HNWy4Zc28omGWrVIUH_A-aQ5D8dW9tda7EH5GpKQYyx9XFgdYibBNZG6IYQJOWs5k-eigtktl5-A13x_sQZkVyUCySPCrkS8cWyXMUs767QHK_fxWecLe0Ezfx098-lDml8Xnbxg")

	val headers_5 = Map(
		"Origin" -> "http://localhost:3000",
		"authorization" -> "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkMmJiZDk0Zjg1MmNmMjYyNzZlZTg5ZTgzNGUyMjRlZiIsImF1ZCI6Imh0dHBzOi8vdmlhZGVlbjNhLnNvbGlkLmNvbW11bml0eSIsImV4cCI6MTU4ODEwMDczMSwiaWF0IjoxNTg4MDk3MTMxLCJpZF90b2tlbiI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW10cFpDSTZJbTAyYUdSclNuUjVRVXBOSW4wLmV5SnBjM01pT2lKb2RIUndjem92TDNOdmJHbGtMbU52YlcxMWJtbDBlU0lzSW5OMVlpSTZJbWgwZEhCek9pOHZkbWxoWkdWbGJqTmhMbk52Ykdsa0xtTnZiVzExYm1sMGVTOXdjbTltYVd4bEwyTmhjbVFqYldVaUxDSmhkV1FpT2lKa01tSmlaRGswWmpnMU1tTm1Nall5TnpabFpUZzVaVGd6TkdVeU1qUmxaaUlzSW1WNGNDSTZNVFU0T1RNd05qY3lNU3dpYVdGMElqb3hOVGc0TURrM01USXhMQ0pxZEdraU9pSXlNRFJqTnpJMk1qUXlPVEJsTnpVeUlpd2libTl1WTJVaU9pSlNOMjlmWldKQmRHOW9NRFJHVjJwcFpYZzRTVmRwUVRSNE1HcHhXREpGYzNCM09GOVFRbTVrWTJOUklpd2lZWHB3SWpvaVpESmlZbVE1TkdZNE5USmpaakkyTWpjMlpXVTRPV1U0TXpSbE1qSTBaV1lpTENKamJtWWlPbnNpYW5kcklqcDdJbUZzWnlJNklsSlRNalUySWl3aVpTSTZJa0ZSUVVJaUxDSmxlSFFpT25SeWRXVXNJbXRsZVY5dmNITWlPbHNpZG1WeWFXWjVJbDBzSW10MGVTSTZJbEpUUVNJc0ltNGlPaUowUkRObmRHODNRUzFuUzJkUVpVSnphM0UyTWpNd2QzRTFReTFSUkRsSVdXaE1PVVl6UzJKNmQxOTZjVXAxYWxwSlExTmtjelo1YkVsbWExZHlMWEIyY2xSS1NsZDJTakF5VW1kTVpXVjVVVkpFTjFGUFdXOUZVRkZDYzJKM1JHcERabVZtZDFwM1EzQlBkR2xwYlcxdVJtbGZabmhJUTBKMk5GcDNWelptTW1aNVZsOTVWVWswYVdkaVUyRnBNVlJqVW1aVGVVZFJNR2N6TW5nMlNVTk1lVUo2U2tWbmVVc3plVWhHVUdWeFJESmFaRkJIU0hreWNUbENWelYxU1daeE1XMHhRWGx4TVVwTlUzUnhNMHQwVmxoaGRuUkhkR3hIWDFaRmFXRlJXRkZqVWtGU1JERlZWR0pvWmpGdWRUaFlaVEZqWTNWTVJHMUhlRXRvZGtaNlpsSnVSUzAzVmtaSk56QlpTV0ZmTlhKcmQzaFljRFJsYjI1dFpHSnhTamhmVWtJeFNHdGplSGRyWVc1S09GTnZZMnRrU1ZCWWNHdDZlbDlWU1RoeU4zSlhRMHBRUm5OTWRVY3lVeTF3YW01alJqTnJXRkVpZlgwc0ltRjBYMmhoYzJnaU9pSmpPRFZrYkVRNGNEWkxVMW93TkZsRGNGbEdYMkZCSW4wLmVTb0FDSEwzSmczU1A3LXBKZHB0UHp5OGl3eVRHMEtOUXkxUC01STdkWXhKOXJoRHlfV050V3lIU2hFWTQwQ2hrd3RIYVNxVDEzSkFXT2ZvQjE5TEhsbUFkY3JyalA4M2N0RnZhczhieVpjbHFwa3F5cmdBY3dhSFZ2enpRblJFUnF2dV80SEM5emctSENQWDBZN0o4eU1yX2hfQm5FWTFOV1NULWFtVXlyY1BERHBQbHF0ajJ1NUhGZFlycUtPX0J1TGJjY3ZUdFVpNU1OX2VIZmt0dFRBc2QyZVVnal9BdmRjanRuZTk4SnpBNVpHRFNrOHlyRmlfcVhmalphX2hQajhrYUlCUUh3T2tDNWpQNUxIX0taeTgzNXl0Wmt4dlN4UmxHN1ZYcE1mUFRWUFZmczIxOGRzTlotZVgzcjlOVXR5OUg2MlBjbkhwcWMwTGFoOEVzdyIsInRva2VuX3R5cGUiOiJwb3AifQ.KSHd9rWfxstFCBguSZp4I_UIX3kXrZ90hEeYMDcrUSnbsp8YzDJ0hAVLH_uEigDHZAghk9OpIM5glutRUKVJOHdOcHZDzWCU884uYcVRW1QKjwj521m62x4oXjedOIrgA17OK5R8WkR5CViJyRyxplv8umQu71nATNwcYvQRHYw9MKpBtdh4dreBGuxqxInWjO3TiSi10jkBU7HNWy4Zc28omGWrVIUH_A-aQ5D8dW9tda7EH5GpKQYyx9XFgdYibBNZG6IYQJOWs5k-eigtktl5-A13x_sQZkVyUCySPCrkS8cWyXMUs767QHK_fxWecLe0Ezfx098-lDml8Xnbxg")

	val headers_7 = Map(
		"Accept" -> "text/turtle",
		"Origin" -> "http://localhost:3000",
		"authorization" -> "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkMmJiZDk0Zjg1MmNmMjYyNzZlZTg5ZTgzNGUyMjRlZiIsImF1ZCI6Imh0dHBzOi8vdmlhZGVlbjNhLnNvbGlkLmNvbW11bml0eSIsImV4cCI6MTU4ODEwMDc1MiwiaWF0IjoxNTg4MDk3MTUyLCJpZF90b2tlbiI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW10cFpDSTZJbTAyYUdSclNuUjVRVXBOSW4wLmV5SnBjM01pT2lKb2RIUndjem92TDNOdmJHbGtMbU52YlcxMWJtbDBlU0lzSW5OMVlpSTZJbWgwZEhCek9pOHZkbWxoWkdWbGJqTmhMbk52Ykdsa0xtTnZiVzExYm1sMGVTOXdjbTltYVd4bEwyTmhjbVFqYldVaUxDSmhkV1FpT2lKa01tSmlaRGswWmpnMU1tTm1Nall5TnpabFpUZzVaVGd6TkdVeU1qUmxaaUlzSW1WNGNDSTZNVFU0T1RNd05qY3lNU3dpYVdGMElqb3hOVGc0TURrM01USXhMQ0pxZEdraU9pSXlNRFJqTnpJMk1qUXlPVEJsTnpVeUlpd2libTl1WTJVaU9pSlNOMjlmWldKQmRHOW9NRFJHVjJwcFpYZzRTVmRwUVRSNE1HcHhXREpGYzNCM09GOVFRbTVrWTJOUklpd2lZWHB3SWpvaVpESmlZbVE1TkdZNE5USmpaakkyTWpjMlpXVTRPV1U0TXpSbE1qSTBaV1lpTENKamJtWWlPbnNpYW5kcklqcDdJbUZzWnlJNklsSlRNalUySWl3aVpTSTZJa0ZSUVVJaUxDSmxlSFFpT25SeWRXVXNJbXRsZVY5dmNITWlPbHNpZG1WeWFXWjVJbDBzSW10MGVTSTZJbEpUUVNJc0ltNGlPaUowUkRObmRHODNRUzFuUzJkUVpVSnphM0UyTWpNd2QzRTFReTFSUkRsSVdXaE1PVVl6UzJKNmQxOTZjVXAxYWxwSlExTmtjelo1YkVsbWExZHlMWEIyY2xSS1NsZDJTakF5VW1kTVpXVjVVVkpFTjFGUFdXOUZVRkZDYzJKM1JHcERabVZtZDFwM1EzQlBkR2xwYlcxdVJtbGZabmhJUTBKMk5GcDNWelptTW1aNVZsOTVWVWswYVdkaVUyRnBNVlJqVW1aVGVVZFJNR2N6TW5nMlNVTk1lVUo2U2tWbmVVc3plVWhHVUdWeFJESmFaRkJIU0hreWNUbENWelYxU1daeE1XMHhRWGx4TVVwTlUzUnhNMHQwVmxoaGRuUkhkR3hIWDFaRmFXRlJXRkZqVWtGU1JERlZWR0pvWmpGdWRUaFlaVEZqWTNWTVJHMUhlRXRvZGtaNlpsSnVSUzAzVmtaSk56QlpTV0ZmTlhKcmQzaFljRFJsYjI1dFpHSnhTamhmVWtJeFNHdGplSGRyWVc1S09GTnZZMnRrU1ZCWWNHdDZlbDlWU1RoeU4zSlhRMHBRUm5OTWRVY3lVeTF3YW01alJqTnJXRkVpZlgwc0ltRjBYMmhoYzJnaU9pSmpPRFZrYkVRNGNEWkxVMW93TkZsRGNGbEdYMkZCSW4wLmVTb0FDSEwzSmczU1A3LXBKZHB0UHp5OGl3eVRHMEtOUXkxUC01STdkWXhKOXJoRHlfV050V3lIU2hFWTQwQ2hrd3RIYVNxVDEzSkFXT2ZvQjE5TEhsbUFkY3JyalA4M2N0RnZhczhieVpjbHFwa3F5cmdBY3dhSFZ2enpRblJFUnF2dV80SEM5emctSENQWDBZN0o4eU1yX2hfQm5FWTFOV1NULWFtVXlyY1BERHBQbHF0ajJ1NUhGZFlycUtPX0J1TGJjY3ZUdFVpNU1OX2VIZmt0dFRBc2QyZVVnal9BdmRjanRuZTk4SnpBNVpHRFNrOHlyRmlfcVhmalphX2hQajhrYUlCUUh3T2tDNWpQNUxIX0taeTgzNXl0Wmt4dlN4UmxHN1ZYcE1mUFRWUFZmczIxOGRzTlotZVgzcjlOVXR5OUg2MlBjbkhwcWMwTGFoOEVzdyIsInRva2VuX3R5cGUiOiJwb3AifQ.I0I_2sCUBkETMFUGY87oWPuYiFvyR1En-C1dHOcoZiNw8Kee6pWZNZwzLzuKe7nhBZFmQkwJ7OuU9Z8A6jtRfyoUeqZsinUxNzTHmZI-ia1LaHs3poJNNcYOVqBTdZLhw8d6BPaOvaPPNNfldfx81rlY2NaEI6MfHHoP_qo_v52lT_IR-2Nrz7Dsvnnpb1d4dUp3JQs8FnngkthqVULH8ljarbwM4JWQ9QK4b-sSLLGRsQIVrUbgyH1Wvfq9gNKncfZkQ7dEnq4-vuTiKbx1uZ8YRsMGVEcxKXfQbjIoa3fIkEQJGoItTToTQzYcRztG5whwUQaVH1HvmKm2DO-VJA")

	val headers_8 = Map(
		"Origin" -> "http://localhost:3000",
		"authorization" -> "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkMmJiZDk0Zjg1MmNmMjYyNzZlZTg5ZTgzNGUyMjRlZiIsImF1ZCI6Imh0dHBzOi8vdmlhZGVlbjNhLnNvbGlkLmNvbW11bml0eSIsImV4cCI6MTU4ODEwMDc1MiwiaWF0IjoxNTg4MDk3MTUyLCJpZF90b2tlbiI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW10cFpDSTZJbTAyYUdSclNuUjVRVXBOSW4wLmV5SnBjM01pT2lKb2RIUndjem92TDNOdmJHbGtMbU52YlcxMWJtbDBlU0lzSW5OMVlpSTZJbWgwZEhCek9pOHZkbWxoWkdWbGJqTmhMbk52Ykdsa0xtTnZiVzExYm1sMGVTOXdjbTltYVd4bEwyTmhjbVFqYldVaUxDSmhkV1FpT2lKa01tSmlaRGswWmpnMU1tTm1Nall5TnpabFpUZzVaVGd6TkdVeU1qUmxaaUlzSW1WNGNDSTZNVFU0T1RNd05qY3lNU3dpYVdGMElqb3hOVGc0TURrM01USXhMQ0pxZEdraU9pSXlNRFJqTnpJMk1qUXlPVEJsTnpVeUlpd2libTl1WTJVaU9pSlNOMjlmWldKQmRHOW9NRFJHVjJwcFpYZzRTVmRwUVRSNE1HcHhXREpGYzNCM09GOVFRbTVrWTJOUklpd2lZWHB3SWpvaVpESmlZbVE1TkdZNE5USmpaakkyTWpjMlpXVTRPV1U0TXpSbE1qSTBaV1lpTENKamJtWWlPbnNpYW5kcklqcDdJbUZzWnlJNklsSlRNalUySWl3aVpTSTZJa0ZSUVVJaUxDSmxlSFFpT25SeWRXVXNJbXRsZVY5dmNITWlPbHNpZG1WeWFXWjVJbDBzSW10MGVTSTZJbEpUUVNJc0ltNGlPaUowUkRObmRHODNRUzFuUzJkUVpVSnphM0UyTWpNd2QzRTFReTFSUkRsSVdXaE1PVVl6UzJKNmQxOTZjVXAxYWxwSlExTmtjelo1YkVsbWExZHlMWEIyY2xSS1NsZDJTakF5VW1kTVpXVjVVVkpFTjFGUFdXOUZVRkZDYzJKM1JHcERabVZtZDFwM1EzQlBkR2xwYlcxdVJtbGZabmhJUTBKMk5GcDNWelptTW1aNVZsOTVWVWswYVdkaVUyRnBNVlJqVW1aVGVVZFJNR2N6TW5nMlNVTk1lVUo2U2tWbmVVc3plVWhHVUdWeFJESmFaRkJIU0hreWNUbENWelYxU1daeE1XMHhRWGx4TVVwTlUzUnhNMHQwVmxoaGRuUkhkR3hIWDFaRmFXRlJXRkZqVWtGU1JERlZWR0pvWmpGdWRUaFlaVEZqWTNWTVJHMUhlRXRvZGtaNlpsSnVSUzAzVmtaSk56QlpTV0ZmTlhKcmQzaFljRFJsYjI1dFpHSnhTamhmVWtJeFNHdGplSGRyWVc1S09GTnZZMnRrU1ZCWWNHdDZlbDlWU1RoeU4zSlhRMHBRUm5OTWRVY3lVeTF3YW01alJqTnJXRkVpZlgwc0ltRjBYMmhoYzJnaU9pSmpPRFZrYkVRNGNEWkxVMW93TkZsRGNGbEdYMkZCSW4wLmVTb0FDSEwzSmczU1A3LXBKZHB0UHp5OGl3eVRHMEtOUXkxUC01STdkWXhKOXJoRHlfV050V3lIU2hFWTQwQ2hrd3RIYVNxVDEzSkFXT2ZvQjE5TEhsbUFkY3JyalA4M2N0RnZhczhieVpjbHFwa3F5cmdBY3dhSFZ2enpRblJFUnF2dV80SEM5emctSENQWDBZN0o4eU1yX2hfQm5FWTFOV1NULWFtVXlyY1BERHBQbHF0ajJ1NUhGZFlycUtPX0J1TGJjY3ZUdFVpNU1OX2VIZmt0dFRBc2QyZVVnal9BdmRjanRuZTk4SnpBNVpHRFNrOHlyRmlfcVhmalphX2hQajhrYUlCUUh3T2tDNWpQNUxIX0taeTgzNXl0Wmt4dlN4UmxHN1ZYcE1mUFRWUFZmczIxOGRzTlotZVgzcjlOVXR5OUg2MlBjbkhwcWMwTGFoOEVzdyIsInRva2VuX3R5cGUiOiJwb3AifQ.I0I_2sCUBkETMFUGY87oWPuYiFvyR1En-C1dHOcoZiNw8Kee6pWZNZwzLzuKe7nhBZFmQkwJ7OuU9Z8A6jtRfyoUeqZsinUxNzTHmZI-ia1LaHs3poJNNcYOVqBTdZLhw8d6BPaOvaPPNNfldfx81rlY2NaEI6MfHHoP_qo_v52lT_IR-2Nrz7Dsvnnpb1d4dUp3JQs8FnngkthqVULH8ljarbwM4JWQ9QK4b-sSLLGRsQIVrUbgyH1Wvfq9gNKncfZkQ7dEnq4-vuTiKbx1uZ8YRsMGVEcxKXfQbjIoa3fIkEQJGoItTToTQzYcRztG5whwUQaVH1HvmKm2DO-VJA")

    val uri1 = "https://viadeen3a.solid.community/viade/routes"

	val scn = scenario("Simulation1")
		.exec(http("request_0")
			.get("/logout")
			.headers(headers_0))
		.pause(2)
		.exec(http("request_1")
			.get("/common/popup.html")
			.headers(headers_1))
		.pause(2)
		.exec(http("request_2")
			.get("/authorize?scope=openid&client_id=d2bbd94f852cf26276ee89e834e224ef&response_type=id_token%20token&request=eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL3NvbGlkLmNvbW11bml0eS9jb21tb24vcG9wdXAuaHRtbCIsImRpc3BsYXkiOiJwYWdlIiwibm9uY2UiOiJSN29fZWJBdG9oMDRGV2ppZXg4SVdpQTR4MGpxWDJFc3B3OF9QQm5kY2NRIiwia2V5Ijp7ImFsZyI6IlJTMjU2IiwiZSI6IkFRQUIiLCJleHQiOnRydWUsImtleV9vcHMiOlsidmVyaWZ5Il0sImt0eSI6IlJTQSIsIm4iOiJ0RDNndG83QS1nS2dQZUJza3E2MjMwd3E1Qy1RRDlIWWhMOUYzS2J6d196cUp1alpJQ1NkczZ5bElma1dyLXB2clRKSld2SjAyUmdMZWV5UVJEN1FPWW9FUFFCc2J3RGpDZmVmd1p3Q3BPdGlpbW1uRmlfZnhIQ0J2NFp3VzZmMmZ5Vl95VUk0aWdiU2FpMVRjUmZTeUdRMGczMng2SUNMeUJ6SkVneUszeUhGUGVxRDJaZFBHSHkycTlCVzV1SWZxMW0xQXlxMUpNU3RxM0t0VlhhdnRHdGxHX1ZFaWFRWFFjUkFSRDFVVGJoZjFudThYZTFjY3VMRG1HeEtodkZ6ZlJuRS03VkZJNzBZSWFfNXJrd3hYcDRlb25tZGJxSjhfUkIxSGtjeHdrYW5KOFNvY2tkSVBYcGt6el9VSThyN3JXQ0pQRnNMdUcyUy1wam5jRjNrWFEifX0.&state=8vp0CKt7ZJqP_vQ-kCMJdhHW7LaYwdcoZIK2W6Kj4Yk")
			.headers(headers_1))
		.pause(2)
		.exec(http("request_3")
			.post("/login/password")
			.headers(headers_3)
			.formParam("username", "viadeen3a")
			.formParam("password", "viadeen3atest123")
			.formParam("response_type", "id_token token")
			.formParam("display", "")
			.formParam("scope", "openid")
			.formParam("client_id", "d2bbd94f852cf26276ee89e834e224ef")
			.formParam("redirect_uri", "https://solid.community/common/popup.html")
			.formParam("state", "8vp0CKt7ZJqP_vQ-kCMJdhHW7LaYwdcoZIK2W6Kj4Yk")
			.formParam("nonce", "")
			.formParam("request", "eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL3NvbGlkLmNvbW11bml0eS9jb21tb24vcG9wdXAuaHRtbCIsImRpc3BsYXkiOiJwYWdlIiwibm9uY2UiOiJSN29fZWJBdG9oMDRGV2ppZXg4SVdpQTR4MGpxWDJFc3B3OF9QQm5kY2NRIiwia2V5Ijp7ImFsZyI6IlJTMjU2IiwiZSI6IkFRQUIiLCJleHQiOnRydWUsImtleV9vcHMiOlsidmVyaWZ5Il0sImt0eSI6IlJTQSIsIm4iOiJ0RDNndG83QS1nS2dQZUJza3E2MjMwd3E1Qy1RRDlIWWhMOUYzS2J6d196cUp1alpJQ1NkczZ5bElma1dyLXB2clRKSld2SjAyUmdMZWV5UVJEN1FPWW9FUFFCc2J3RGpDZmVmd1p3Q3BPdGlpbW1uRmlfZnhIQ0J2NFp3VzZmMmZ5Vl95VUk0aWdiU2FpMVRjUmZTeUdRMGczMng2SUNMeUJ6SkVneUszeUhGUGVxRDJaZFBHSHkycTlCVzV1SWZxMW0xQXlxMUpNU3RxM0t0VlhhdnRHdGxHX1ZFaWFRWFFjUkFSRDFVVGJoZjFudThYZTFjY3VMRG1HeEtodkZ6ZlJuRS03VkZJNzBZSWFfNXJrd3hYcDRlb25tZGJxSjhfUkIxSGtjeHdrYW5KOFNvY2tkSVBYcGt6el9VSThyN3JXQ0pQRnNMdUcyUy1wam5jRjNrWFEifX0."))
		.pause(2)
		.exec(http("request_4")
			.get(uri1 + "/")
			.headers(headers_4)
			.resources(http("request_5")
			.get(uri1 + "/07ccbc34-bdda-459b-9418-466caec8637f.json")
			.headers(headers_5),
            http("request_6")
			.get(uri1 + "/f9eb9f0d-f34d-49aa-b711-9019f9b8f1cc.json")
			.headers(headers_5)))
		.pause(2)
		.exec(http("request_7")
			.get(uri1 + "/")
			.headers(headers_7)
			.resources(http("request_8")
			.get(uri1 + "/07ccbc34-bdda-459b-9418-466caec8637f.json")
			.headers(headers_8),
            http("request_9")
			.get(uri1 + "/f9eb9f0d-f34d-49aa-b711-9019f9b8f1cc.json")
			.headers(headers_8)))

	setUp(scn.inject(atOnceUsers(100))).protocols(httpProtocol)
}