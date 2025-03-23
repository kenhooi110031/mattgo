import os
from openai import OpenAI

# Initialize the OpenAI client using your API key.
client = OpenAI(api_key="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")


def analyze_move(best_move, board_context):
    """
    Uses the OpenAI Chat Completions API to analyze the given move in its context.

    Parameters:
        best_move (str): The best move suggestion (e.g., "D4").
        board_context (str): The current board context (e.g., "middle game on a 19x19 board").

    Returns:
        str: A detailed analysis of the move provided by ChatGPT.
    """
    prompt = (
        f"Given the best move {best_move} in the context of {board_context}, "
        "analyze this move and provide an explanation including strategic insights, "
        "potential risks, and long-term implications for the game, less than 50 words."
    )

    try:
        # Using the Chat Completions API (the previous standard is still supported indefinitely)
        completion = client.chat.completions.create(
            model="gpt-4o",  # Change this to "gpt-3.5-turbo" if you prefer.
            messages=[
                {"role": "system", "content": "You are a chess analyst."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1000,
        )
        analysis = completion.choices[0].message.content.strip()
        return analysis
    except Exception as e:
        print("Error calling ChatGPT API:", e)
        return "Error: Unable to fetch analysis from ChatGPT API."


if __name__ == "__main__":
    # Example usage:
    best_move = "D4"
    board_context = "middle game on a 19x19 board"
    analysis = analyze_move(best_move, board_context)
    print("Analysis:", analysis)
