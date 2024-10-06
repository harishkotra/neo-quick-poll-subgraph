import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  NeoQuickPoll,
  PollCreated,
  VoteCast
} from "../generated/NeoQuickPoll/NeoQuickPoll"
import { Poll, Vote } from "../generated/schema"

export function handlePollCreated(event: PollCreated): void {
  let poll = new Poll(event.params.pollId)
  let contract = NeoQuickPoll.bind(event.address)
  let pollData = contract.getPollResults(event.params.pollId)

  poll.question = pollData.value0
  poll.options = pollData.value1
  poll.votes = new Array<BigInt>(pollData.value1.length).fill(BigInt.fromI32(0))
  poll.creator = event.transaction.from
  poll.createdAt = event.block.timestamp

  poll.save()
}

export function handleVoteCast(event: VoteCast): void {
  let pollId = event.params.pollId
  let poll = Poll.load(pollId)
  if (poll) {
    let contract = NeoQuickPoll.bind(event.address)
    let pollData = contract.getPollResults(pollId)
    poll.votes = pollData.value2
    poll.save()
  }

  let voteId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString()
  let vote = new Vote(voteId)
  vote.poll = pollId
  vote.voter = event.params.voter
  vote.option = event.params.option
  vote.timestamp = event.block.timestamp
  vote.save()
}