package viade

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class Simulation2 extends Simulation {

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

	val headers_5 = Map("Accept" -> "image/*;q=0.9, */*;q=0.1, application/rdf+xml;q=0.9, application/xhtml+xml, text/xml;q=0.5, application/xml;q=0.5, text/html;q=0.9, text/plain;q=0.5, text/n3;q=1.0, text/turtle;q=1")

	val headers_9 = Map(
		"Access-Control-Request-Headers" -> "authorization",
		"Access-Control-Request-Method" -> "GET",
		"Origin" -> "http://localhost:3000")

	val headers_10 = Map(
		"Accept" -> "text/turtle",
		"Origin" -> "http://localhost:3000",
		"authorization" -> "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkMmJiZDk0Zjg1MmNmMjYyNzZlZTg5ZTgzNGUyMjRlZiIsImF1ZCI6Imh0dHBzOi8vdmlhZGVlbjNhLnNvbGlkLmNvbW11bml0eSIsImV4cCI6MTU4ODEwMTg3OSwiaWF0IjoxNTg4MDk4Mjc5LCJpZF90b2tlbiI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW10cFpDSTZJbTAyYUdSclNuUjVRVXBOSW4wLmV5SnBjM01pT2lKb2RIUndjem92TDNOdmJHbGtMbU52YlcxMWJtbDBlU0lzSW5OMVlpSTZJbWgwZEhCek9pOHZkbWxoWkdWbGJqTmhMbk52Ykdsa0xtTnZiVzExYm1sMGVTOXdjbTltYVd4bEwyTmhjbVFqYldVaUxDSmhkV1FpT2lKa01tSmlaRGswWmpnMU1tTm1Nall5TnpabFpUZzVaVGd6TkdVeU1qUmxaaUlzSW1WNGNDSTZNVFU0T1RNd056ZzFPU3dpYVdGMElqb3hOVGc0TURrNE1qVTVMQ0pxZEdraU9pSXdOakEzTW1abFl6azJZbU0wWXpobElpd2libTl1WTJVaU9pSkRjMjEwTFZCeVpGUkJhbWQ1ZWtaUGRrZ3hOR1JvVVZaaGNFbFhSblZrYzI1UmFERTNNR2QxVDFRMElpd2lZWHB3SWpvaVpESmlZbVE1TkdZNE5USmpaakkyTWpjMlpXVTRPV1U0TXpSbE1qSTBaV1lpTENKamJtWWlPbnNpYW5kcklqcDdJbUZzWnlJNklsSlRNalUySWl3aVpTSTZJa0ZSUVVJaUxDSmxlSFFpT25SeWRXVXNJbXRsZVY5dmNITWlPbHNpZG1WeWFXWjVJbDBzSW10MGVTSTZJbEpUUVNJc0ltNGlPaUoxZEhFd2JIVnZiVFV5YlZOWk1sZG5ZV1ZQZDB0T1lrNWpWVE5TUWpsWFRIRmhUVWxTYjA5NlkwZEVYM0ZLVm5nNGIyOW9iMGhoU0hZd05sRm9lSE55T1dOSWVpMWFSMEZ6YlhCS1VqWjVWMWREVmprMk9YRnBjR2RwYm5JM09GVnRWbGxxZFVGbVUxaHRPVEpCUTI1dGVGRTVNekpUU2tadWRsTTNlV1paUzNCTllVeHRRV2M1TVRWMmNIWnpZall6U0dkb2RVcHVSalJ2TjFwMlJFMHpVVzFJWTJ4dlNrZGFVMnR3YTJoSlYxbDZkMkp1Wm00M1QzZEdOVkJOUW1Rd01Vb3lRWGRTUjFGSU5ISTFZVk5KTURaZmJUUmhZblY2TW1wb00waERiRWRHZHpsVFJqZHBjalZvWkZWSmRUQndVMlY0YzBoS1Frc3RRMGxKZUdJdE5XVmtRMHRoVFZKa2VVTXdWWGxzUTIxWVdqSTFNWFF0V1hCUlZUZFZNMFJIT0ZkeFJsRTRUMk5tV0dkamRtMVVaMGRYUVZScVlWaHJYMnhOYVhwcVh6WnBTSEpOY0dod2MwSTBXazh3Y21nelF6ZEJlWGNpZlgwc0ltRjBYMmhoYzJnaU9pSlRaSEJtYW05eFNHd3dOamx1VUVvdFRXRk9SMTkzSW4wLkR6ZHVfWjI5Z3JiT1ZOMUpkZUw0QkRRR2VTc2dxZ1V5MFRjcFFVOVRYbjBhLTRpbWVlWDEyS1c2c28xeUIzZDkzNEpMOHVGeE5xTWhsRU5vOWFNV3hYY0NwbENvd2x5eVpyZko5cnFua3hKc291X1I5Nm9zeW1ybHpHN0FBdXNmS19QdWVyNDM2V0hpRlpzdEtCLTdNU1lzOEZRbld4Vi00RlZpQ2tsd215ZGp3RjZBTWNteGk0cDdIWkpNWFVZY1NsZ2JKdEtIV3Q1ODFuQ3ZpRlpCNG8tdEplY2pPcTdvUzBLak1zRl9RbUh1bFhHaEd5bEJrRkdQcDZSV3ZTTWJ4NlZLcVBDaDZrYUZyVU9STWtPMGR5eXRsRUJDRVMxQUZlWGNHUzBsT1BiS0NxeGxPRldHTmZ0VllJWG9zUVdrbUc0Qmd0QVpTNDJRMlhBWGRFSTZsQSIsInRva2VuX3R5cGUiOiJwb3AifQ.KCy7qsXW3vizvWrd-I31IE_9_qSjlEf-nRTyaB6uOcurwkZ3lsgnmuidAQCcQX1fV3L-mHG5CYo2Iq9QZmAg4OqPwGB21GeidiArhyKbfk27Clq7N3PCZaIwF3VuaETVT4Xkj_4_L19y8V3sN8eamYub6Gpxh8Ala48B4-dMJA5KQgBNasn0i_rk0sY8M3WWr06fNqnaNtfFkE_dhZtARKUtvDR5mck5BTcla1SIgKRUsGgslcNb_eO-9XlKgQ1_5nzUabvzxYZdWQ4B4KOjOOxgjx12X17UaHbHz2_xs8_q7ry7oPXhfUrQnW-wpqx1AiAG_1RFjmxGQjF_T3z2-Q")

	val headers_11 = Map(
		"Access-Control-Request-Headers" -> "authorization",
		"Access-Control-Request-Method" -> "HEAD",
		"Origin" -> "http://localhost:3000")

	val headers_12 = Map(
		"Origin" -> "http://localhost:3000",
		"authorization" -> "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkMmJiZDk0Zjg1MmNmMjYyNzZlZTg5ZTgzNGUyMjRlZiIsImF1ZCI6Imh0dHBzOi8vdmlhZGVlbjNhLnNvbGlkLmNvbW11bml0eSIsImV4cCI6MTU4ODEwMTg3OSwiaWF0IjoxNTg4MDk4Mjc5LCJpZF90b2tlbiI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW10cFpDSTZJbTAyYUdSclNuUjVRVXBOSW4wLmV5SnBjM01pT2lKb2RIUndjem92TDNOdmJHbGtMbU52YlcxMWJtbDBlU0lzSW5OMVlpSTZJbWgwZEhCek9pOHZkbWxoWkdWbGJqTmhMbk52Ykdsa0xtTnZiVzExYm1sMGVTOXdjbTltYVd4bEwyTmhjbVFqYldVaUxDSmhkV1FpT2lKa01tSmlaRGswWmpnMU1tTm1Nall5TnpabFpUZzVaVGd6TkdVeU1qUmxaaUlzSW1WNGNDSTZNVFU0T1RNd056ZzFPU3dpYVdGMElqb3hOVGc0TURrNE1qVTVMQ0pxZEdraU9pSXdOakEzTW1abFl6azJZbU0wWXpobElpd2libTl1WTJVaU9pSkRjMjEwTFZCeVpGUkJhbWQ1ZWtaUGRrZ3hOR1JvVVZaaGNFbFhSblZrYzI1UmFERTNNR2QxVDFRMElpd2lZWHB3SWpvaVpESmlZbVE1TkdZNE5USmpaakkyTWpjMlpXVTRPV1U0TXpSbE1qSTBaV1lpTENKamJtWWlPbnNpYW5kcklqcDdJbUZzWnlJNklsSlRNalUySWl3aVpTSTZJa0ZSUVVJaUxDSmxlSFFpT25SeWRXVXNJbXRsZVY5dmNITWlPbHNpZG1WeWFXWjVJbDBzSW10MGVTSTZJbEpUUVNJc0ltNGlPaUoxZEhFd2JIVnZiVFV5YlZOWk1sZG5ZV1ZQZDB0T1lrNWpWVE5TUWpsWFRIRmhUVWxTYjA5NlkwZEVYM0ZLVm5nNGIyOW9iMGhoU0hZd05sRm9lSE55T1dOSWVpMWFSMEZ6YlhCS1VqWjVWMWREVmprMk9YRnBjR2RwYm5JM09GVnRWbGxxZFVGbVUxaHRPVEpCUTI1dGVGRTVNekpUU2tadWRsTTNlV1paUzNCTllVeHRRV2M1TVRWMmNIWnpZall6U0dkb2RVcHVSalJ2TjFwMlJFMHpVVzFJWTJ4dlNrZGFVMnR3YTJoSlYxbDZkMkp1Wm00M1QzZEdOVkJOUW1Rd01Vb3lRWGRTUjFGSU5ISTFZVk5KTURaZmJUUmhZblY2TW1wb00waERiRWRHZHpsVFJqZHBjalZvWkZWSmRUQndVMlY0YzBoS1Frc3RRMGxKZUdJdE5XVmtRMHRoVFZKa2VVTXdWWGxzUTIxWVdqSTFNWFF0V1hCUlZUZFZNMFJIT0ZkeFJsRTRUMk5tV0dkamRtMVVaMGRYUVZScVlWaHJYMnhOYVhwcVh6WnBTSEpOY0dod2MwSTBXazh3Y21nelF6ZEJlWGNpZlgwc0ltRjBYMmhoYzJnaU9pSlRaSEJtYW05eFNHd3dOamx1VUVvdFRXRk9SMTkzSW4wLkR6ZHVfWjI5Z3JiT1ZOMUpkZUw0QkRRR2VTc2dxZ1V5MFRjcFFVOVRYbjBhLTRpbWVlWDEyS1c2c28xeUIzZDkzNEpMOHVGeE5xTWhsRU5vOWFNV3hYY0NwbENvd2x5eVpyZko5cnFua3hKc291X1I5Nm9zeW1ybHpHN0FBdXNmS19QdWVyNDM2V0hpRlpzdEtCLTdNU1lzOEZRbld4Vi00RlZpQ2tsd215ZGp3RjZBTWNteGk0cDdIWkpNWFVZY1NsZ2JKdEtIV3Q1ODFuQ3ZpRlpCNG8tdEplY2pPcTdvUzBLak1zRl9RbUh1bFhHaEd5bEJrRkdQcDZSV3ZTTWJ4NlZLcVBDaDZrYUZyVU9STWtPMGR5eXRsRUJDRVMxQUZlWGNHUzBsT1BiS0NxeGxPRldHTmZ0VllJWG9zUVdrbUc0Qmd0QVpTNDJRMlhBWGRFSTZsQSIsInRva2VuX3R5cGUiOiJwb3AifQ.KCy7qsXW3vizvWrd-I31IE_9_qSjlEf-nRTyaB6uOcurwkZ3lsgnmuidAQCcQX1fV3L-mHG5CYo2Iq9QZmAg4OqPwGB21GeidiArhyKbfk27Clq7N3PCZaIwF3VuaETVT4Xkj_4_L19y8V3sN8eamYub6Gpxh8Ala48B4-dMJA5KQgBNasn0i_rk0sY8M3WWr06fNqnaNtfFkE_dhZtARKUtvDR5mck5BTcla1SIgKRUsGgslcNb_eO-9XlKgQ1_5nzUabvzxYZdWQ4B4KOjOOxgjx12X17UaHbHz2_xs8_q7ry7oPXhfUrQnW-wpqx1AiAG_1RFjmxGQjF_T3z2-Q")

	val headers_13 = Map(
		"Origin" -> "http://localhost:3000",
		"authorization" -> "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkMmJiZDk0Zjg1MmNmMjYyNzZlZTg5ZTgzNGUyMjRlZiIsImF1ZCI6Imh0dHBzOi8vdmlhZGVlbjNhLnNvbGlkLmNvbW11bml0eSIsImV4cCI6MTU4ODEwMTg4MCwiaWF0IjoxNTg4MDk4MjgwLCJpZF90b2tlbiI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW10cFpDSTZJbTAyYUdSclNuUjVRVXBOSW4wLmV5SnBjM01pT2lKb2RIUndjem92TDNOdmJHbGtMbU52YlcxMWJtbDBlU0lzSW5OMVlpSTZJbWgwZEhCek9pOHZkbWxoWkdWbGJqTmhMbk52Ykdsa0xtTnZiVzExYm1sMGVTOXdjbTltYVd4bEwyTmhjbVFqYldVaUxDSmhkV1FpT2lKa01tSmlaRGswWmpnMU1tTm1Nall5TnpabFpUZzVaVGd6TkdVeU1qUmxaaUlzSW1WNGNDSTZNVFU0T1RNd056ZzFPU3dpYVdGMElqb3hOVGc0TURrNE1qVTVMQ0pxZEdraU9pSXdOakEzTW1abFl6azJZbU0wWXpobElpd2libTl1WTJVaU9pSkRjMjEwTFZCeVpGUkJhbWQ1ZWtaUGRrZ3hOR1JvVVZaaGNFbFhSblZrYzI1UmFERTNNR2QxVDFRMElpd2lZWHB3SWpvaVpESmlZbVE1TkdZNE5USmpaakkyTWpjMlpXVTRPV1U0TXpSbE1qSTBaV1lpTENKamJtWWlPbnNpYW5kcklqcDdJbUZzWnlJNklsSlRNalUySWl3aVpTSTZJa0ZSUVVJaUxDSmxlSFFpT25SeWRXVXNJbXRsZVY5dmNITWlPbHNpZG1WeWFXWjVJbDBzSW10MGVTSTZJbEpUUVNJc0ltNGlPaUoxZEhFd2JIVnZiVFV5YlZOWk1sZG5ZV1ZQZDB0T1lrNWpWVE5TUWpsWFRIRmhUVWxTYjA5NlkwZEVYM0ZLVm5nNGIyOW9iMGhoU0hZd05sRm9lSE55T1dOSWVpMWFSMEZ6YlhCS1VqWjVWMWREVmprMk9YRnBjR2RwYm5JM09GVnRWbGxxZFVGbVUxaHRPVEpCUTI1dGVGRTVNekpUU2tadWRsTTNlV1paUzNCTllVeHRRV2M1TVRWMmNIWnpZall6U0dkb2RVcHVSalJ2TjFwMlJFMHpVVzFJWTJ4dlNrZGFVMnR3YTJoSlYxbDZkMkp1Wm00M1QzZEdOVkJOUW1Rd01Vb3lRWGRTUjFGSU5ISTFZVk5KTURaZmJUUmhZblY2TW1wb00waERiRWRHZHpsVFJqZHBjalZvWkZWSmRUQndVMlY0YzBoS1Frc3RRMGxKZUdJdE5XVmtRMHRoVFZKa2VVTXdWWGxzUTIxWVdqSTFNWFF0V1hCUlZUZFZNMFJIT0ZkeFJsRTRUMk5tV0dkamRtMVVaMGRYUVZScVlWaHJYMnhOYVhwcVh6WnBTSEpOY0dod2MwSTBXazh3Y21nelF6ZEJlWGNpZlgwc0ltRjBYMmhoYzJnaU9pSlRaSEJtYW05eFNHd3dOamx1VUVvdFRXRk9SMTkzSW4wLkR6ZHVfWjI5Z3JiT1ZOMUpkZUw0QkRRR2VTc2dxZ1V5MFRjcFFVOVRYbjBhLTRpbWVlWDEyS1c2c28xeUIzZDkzNEpMOHVGeE5xTWhsRU5vOWFNV3hYY0NwbENvd2x5eVpyZko5cnFua3hKc291X1I5Nm9zeW1ybHpHN0FBdXNmS19QdWVyNDM2V0hpRlpzdEtCLTdNU1lzOEZRbld4Vi00RlZpQ2tsd215ZGp3RjZBTWNteGk0cDdIWkpNWFVZY1NsZ2JKdEtIV3Q1ODFuQ3ZpRlpCNG8tdEplY2pPcTdvUzBLak1zRl9RbUh1bFhHaEd5bEJrRkdQcDZSV3ZTTWJ4NlZLcVBDaDZrYUZyVU9STWtPMGR5eXRsRUJDRVMxQUZlWGNHUzBsT1BiS0NxeGxPRldHTmZ0VllJWG9zUVdrbUc0Qmd0QVpTNDJRMlhBWGRFSTZsQSIsInRva2VuX3R5cGUiOiJwb3AifQ.kfHw-Ow8F6TDklHw5mAR8P4nmWm3qd5dwJyXWtTh5kdC7vXA1vmLAamW26cFw_prdNxktfr_I31VYHpUyPHpACh4trkQkKAHzt9-v0mUWRKMH2R-cQe6T_16jtFtUo6VWexHIu7QE1YjhG3Wnki2qGIXToRrcaYKRtCnqm9qs0w2VzQistQqsc-qAJVJjhB4--gcWMc4exIlQMQcbxb1AaWzYzJIbkWjcnRGB750c83gfmyLikAvDfPxFE3ed8f3Ajb7fOtUK7ovtgFnqN7jpomarfDpy-5AKfScxrwwb2153tHjzwIyWVWJIeWc8Nbl7ftnAHn2Cmbx-Rn585alGA")

    val uri1 = "https://viadeen3a.solid.community"

	val scn = scenario("Simulation2")
		.exec(http("request_0")
			.get("/logout")
			.headers(headers_0))
		.pause(1)
		.exec(http("request_1")
			.get("/common/popup.html")
			.headers(headers_1))
		.pause(1)
		.exec(http("request_2")
			.get("/authorize?scope=openid&client_id=d2bbd94f852cf26276ee89e834e224ef&response_type=id_token%20token&request=eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL3NvbGlkLmNvbW11bml0eS9jb21tb24vcG9wdXAuaHRtbCIsImRpc3BsYXkiOiJwYWdlIiwibm9uY2UiOiJDc210LVByZFRBamd5ekZPdkgxNGRoUVZhcElXRnVkc25RaDE3MGd1T1Q0Iiwia2V5Ijp7ImFsZyI6IlJTMjU2IiwiZSI6IkFRQUIiLCJleHQiOnRydWUsImtleV9vcHMiOlsidmVyaWZ5Il0sImt0eSI6IlJTQSIsIm4iOiJ1dHEwbHVvbTUybVNZMldnYWVPd0tOYk5jVTNSQjlXTHFhTUlSb096Y0dEX3FKVng4b29ob0hhSHYwNlFoeHNyOWNIei1aR0FzbXBKUjZ5V1dDVjk2OXFpcGdpbnI3OFVtVllqdUFmU1htOTJBQ25teFE5MzJTSkZudlM3eWZZS3BNYUxtQWc5MTV2cHZzYjYzSGdodUpuRjRvN1p2RE0zUW1IY2xvSkdaU2twa2hJV1l6d2JuZm43T3dGNVBNQmQwMUoyQXdSR1FINHI1YVNJMDZfbTRhYnV6MmpoM0hDbEdGdzlTRjdpcjVoZFVJdTBwU2V4c0hKQkstQ0lJeGItNWVkQ0thTVJkeUMwVXlsQ21YWjI1MXQtWXBRVTdVM0RHOFdxRlE4T2NmWGdjdm1UZ0dXQVRqYVhrX2xNaXpqXzZpSHJNcGhwc0I0Wk8wcmgzQzdBeXcifX0.&state=X7vLtiAMhe2dO0-Go0WcHM-rcKbDIoXi026mfnRKn6Q")
			.headers(headers_1))
		.pause(1)
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
			.formParam("state", "X7vLtiAMhe2dO0-Go0WcHM-rcKbDIoXi026mfnRKn6Q")
			.formParam("nonce", "")
			.formParam("request", "eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL3NvbGlkLmNvbW11bml0eS9jb21tb24vcG9wdXAuaHRtbCIsImRpc3BsYXkiOiJwYWdlIiwibm9uY2UiOiJDc210LVByZFRBamd5ekZPdkgxNGRoUVZhcElXRnVkc25RaDE3MGd1T1Q0Iiwia2V5Ijp7ImFsZyI6IlJTMjU2IiwiZSI6IkFRQUIiLCJleHQiOnRydWUsImtleV9vcHMiOlsidmVyaWZ5Il0sImt0eSI6IlJTQSIsIm4iOiJ1dHEwbHVvbTUybVNZMldnYWVPd0tOYk5jVTNSQjlXTHFhTUlSb096Y0dEX3FKVng4b29ob0hhSHYwNlFoeHNyOWNIei1aR0FzbXBKUjZ5V1dDVjk2OXFpcGdpbnI3OFVtVllqdUFmU1htOTJBQ25teFE5MzJTSkZudlM3eWZZS3BNYUxtQWc5MTV2cHZzYjYzSGdodUpuRjRvN1p2RE0zUW1IY2xvSkdaU2twa2hJV1l6d2JuZm43T3dGNVBNQmQwMUoyQXdSR1FINHI1YVNJMDZfbTRhYnV6MmpoM0hDbEdGdzlTRjdpcjVoZFVJdTBwU2V4c0hKQkstQ0lJeGItNWVkQ0thTVJkeUMwVXlsQ21YWjI1MXQtWXBRVTdVM0RHOFdxRlE4T2NmWGdjdm1UZ0dXQVRqYVhrX2xNaXpqXzZpSHJNcGhwc0I0Wk8wcmgzQzdBeXcifX0."))
		.pause(1)
		.exec(http("request_4")
			.get(uri1 + "/profile/card")
			.headers(headers_1)
			.resources(http("request_5")
			.get(uri1 + "/profile/card")
			.headers(headers_5),
            http("request_6")
			.get(uri1 + "/settings/prefs.ttl")
			.headers(headers_5),
            http("request_7")
			.get(uri1 + "/settings/publicTypeIndex.ttl")
			.headers(headers_5),
            http("request_8")
			.get(uri1 + "/settings/privateTypeIndex.ttl")
			.headers(headers_5)))
		.pause(1)
		.exec(http("request_9")
			.options(uri1 + "/viade/groups/")
			.headers(headers_9)
			.resources(http("request_10")
			.get(uri1 + "/viade/groups/")
			.headers(headers_10)
			.check(status.is(404)),
            http("request_11")
			.options(uri1 + "/viade/")
			.headers(headers_11),
            http("request_12")
			.head(uri1 + "/viade/")
			.headers(headers_12),
            http("request_13")
			.head(uri1 + "/viade/routes/")
			.headers(headers_13),
            http("request_14")
			.head(uri1 + "/viade/resources/")
			.headers(headers_13),
            http("request_15")
			.head(uri1 + "/viade/comments/")
			.headers(headers_13),
            http("request_16")
			.head(uri1 + "/viade/shared/")
			.headers(headers_13)))
		.pause(1)
		.exec(http("request_17")
			.get("/logout")
			.headers(headers_0))

	setUp(scn.inject(rampUsers(50) during (60 seconds))).protocols(httpProtocol)
}