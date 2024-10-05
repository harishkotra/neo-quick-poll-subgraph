import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { PollCreated, VoteCast } from "../generated/NeoQuickPoll/NeoQuickPoll"

export function createPollCreatedEvent(
  pollId: string,
  question: string
): PollCreated {
  let pollCreatedEvent = changetype<PollCreated>(newMockEvent())

  pollCreatedEvent.parameters = new Array()

  pollCreatedEvent.parameters.push(
    new ethereum.EventParam("pollId", ethereum.Value.fromString(pollId))
  )
  pollCreatedEvent.parameters.push(
    new ethereum.EventParam("question", ethereum.Value.fromString(question))
  )

  return pollCreatedEvent
}

export function createVoteCastEvent(
  pollId: string,
  option: string,
  voter: Address
): VoteCast {
  let voteCastEvent = changetype<VoteCast>(newMockEvent())

  voteCastEvent.parameters = new Array()

  voteCastEvent.parameters.push(
    new ethereum.EventParam("pollId", ethereum.Value.fromString(pollId))
  )
  voteCastEvent.parameters.push(
    new ethereum.EventParam("option", ethereum.Value.fromString(option))
  )
  voteCastEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )

  return voteCastEvent
}
