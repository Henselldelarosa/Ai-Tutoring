"""empty message

Revision ID: e2582b5d4602
Revises: 
Create Date: 2023-11-05 10:21:37.499127

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e2582b5d4602'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('language', sa.String(length=255), nullable=True),
    sa.Column('grade', sa.Integer(), nullable=True),
    sa.Column('learning_goal', sa.String(length=255), nullable=True),
    sa.Column('subscription_start_date', sa.Date(), nullable=True),
    sa.Column('subscription_end_date', sa.Date(), nullable=True),
    sa.Column('credits', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    # ### end Alembic commands ###