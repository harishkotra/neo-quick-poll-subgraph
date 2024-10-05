import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { PollCreated } from "../generated/schema"
import { PollCreated as PollCreatedEvent } from "../generated/NeoQuickPoll/NeoQuickPoll"
import { handlePollCreated } from "../src/neo-quick-poll"
import { createPollCreatedEvent } from "./neo-quick-poll-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let pollId = "Example string value"
    let question = "Example string value"
    let newPollCreatedEvent = createPollCreatedEvent(pollId, question)
    handlePollCreated(newPollCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("PollCreated created and stored", () => {
    assert.entityCount("PollCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "PollCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "pollId",
      "Example string value"
    )
    assert.fieldEquals(
      "PollCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "question",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
